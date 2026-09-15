import {productions} from './data.js';
export function assess(f){
 const reasons=[],open=[],conditions=[],evidence=new Set(['POL-01']);
 const add=(level,title,detail,ids=[],owner='Leila Morgan · Business & Legal Affairs')=>{reasons.push({level,title,detail,ids});ids.forEach(x=>evidence.add(x));if(level==='review')open.push({title,detail,owner});};
 const production=productions.find(p=>p.id===f.source);
 if(production)evidence.add(production.record);
 const unknown=['source','material','operation','destination','tool','location'].filter(k=>!f[k]||f[k]==='unknown');
 if(unknown.length)add('review','Some details still need confirmation','Confirm the missing source, material, operation, destination or processing location before relying on a permission.');
 if(f.inventory!=='known')add('review','The exact material has not been verified','The data steward must identify the files, contributors and applicable agreements for this dataset. A permission for a sample pack does not cover an unverified selection.',[], 'Samir Patel · Production Data Steward');
 if(f.material==='comms'&&f.operation==='automate')add('restricted','Employee performance ranking is prohibited','The studio policy prohibits using staff communications or people records to rank individual performance or make automated employment decisions. An approved tool cannot authorise this use.',['PEOPLE-02']);
 if(f.tool==='public')add('restricted','This material cannot enter a personal or public AI account','The source and people records in this studio require an approved, purpose-specific environment. Change the proposed environment and run a fresh check.',['POL-01']);
 if(f.source==='tiny'&&['train','synthesise'].includes(f.operation)&&f.destination!=='tiny')add('restricted','Client material is excluded from reusable model training','The Tiny Titans agreement confines its show assets to the production and expressly excludes training a reusable company model.',['PSA-031']);
 if(f.source==='harbor'){
  add('review','The client’s reuse permission is missing','Harbor Heroes is complete, but the recorded agreement gives no verified permission for this AI use. Legal must establish the proposed activity and destination with StreamWave Kids.',['PSA-017']);
  if(f.material==='voice'){
   evidence.add('HH-VOICE');evidence.add('DEC-008');
   if(f.dataset!=='mateo')add('review','Ava’s consent does not cover this use','Ava’s contract requires a signed, purpose-specific rider for training and cross-show reuse, including compensation. No signed rider is recorded.',['AVA-12','AVPC-24']);
   if(f.dataset!=='ava'){
    if(f.operation==='synthesise')add('restricted','Mateo’s contract prohibits synthetic performance','His current rider prohibits generating a synthetic voice or a substitute performance. The proposed dataset includes Mateo.',['MATEO-08','USV-23']);
    else add('review','Mateo’s training rights need a specific interpretation','His synthetic-performance restriction is recorded, while mouth-shape model training is unaddressed. Legal needs a technical description of what the model learns and retains.',['MATEO-08','USV-23']);
   }
  }
 }
 if(f.source==='sky')add('review','Partner and contributor permissions are unresolved','BrightArc must approve the AI use. Eli’s engagement and the applicable collective terms require a separate contributor-rights review.',['COP-009','ELI-03','ART-26']);
 let covered=false,owner='Leila Morgan · Business & Legal Affairs',authority='A human decision is required',expiry='After the missing evidence is resolved';
 if(f.source==='tiny'&&f.material==='meeting'&&f.operation==='summarise'&&f.destination==='tiny'&&f.tool==='note'){
  covered=true;owner='Grace Tan · Information Governance';authority='Standing approval DEC-012 · Grace Tan · 12 Sep 2026';expiry='12 Dec 2026';
  add('allow','This meeting falls within a recorded approval','The verified TT-0912 transcript contains production updates only, with participant notice and personal content removed.',['TT-MEET','PSA-031','DEC-012']);
  add('allow','The workspace matches the permission','NotePilot is approved for this show team, with provider training disabled, a 90-day retention limit and authorised Brisbane / Los Angeles access.',['TOOL-NOTE']);
  if(!['Brisbane','Los Angeles'].includes(f.location))add('review','Access from this location needs review','The recorded meeting permission covers the authorised Brisbane and Los Angeles show team. Confirm the additional access location.',['TOOL-NOTE'],'Isaac Romero · IT & Security');
 }
 if(f.source==='moss'&&f.material==='art'&&f.operation==='generate'&&f.destination==='moss'&&f.tool==='frame'){
  covered=true;owner='Maya Chen · AI Governance';authority='Conditional exception DEC-014 · Maya Chen · 02 Sep 2026';expiry='30 Nov 2026';
  add('allow','The cleared concept pack is covered','Northstar’s ownership and the verified artist permissions cover the 18 designs in MM-C18 for same-show exploration.',['NIP-004','MM-ART','DEC-014']);
  add('allow','The creative tenant matches the permission','FrameFoundry’s approved private tenant has provider training disabled and a 14-day input-retention limit.',['TOOL-FRAME']);
  conditions.push('Record the source-pack version and link generated outputs to it.','Delete uploaded inputs within 14 days and keep deletion evidence.','Have Theo Wallace, Art Director, review outputs before production use. Keep them within Moss & Moon.');
  if(!['Sydney','Brisbane'].includes(f.location))add('review','The proposed access location is outside the exception','The exception covers the Sydney and Brisbane art teams only.',['TOOL-FRAME'],'Isaac Romero · IT & Security');
 }
 if(f.source==='moss'&&f.material==='voice'&&f.operation==='train'&&f.destination==='moss'&&f.tool==='motion'){
  covered=true;owner='Leila Morgan · Business & Legal Affairs';authority='Signed Nia research rider NIA-06 · verified 14 Sep 2026';expiry='31 Dec 2026';
  add('allow','Nia has agreed to this bounded experiment','The MM-NIA-06 recordings may be used for Moss & Moon mouth-shape prediction. The rider and collective minimums are verified; the research fee is recorded as paid.',['NIA-06','AVPC-24','NIP-004']);
  add('allow','The lab is approved for this exact experiment','MotionMap uses Australian processing with provider training disabled. The permission covers the named Sydney and Brisbane research team.',['TOOL-MOTION']);
  conditions.push('Use only Nia’s MM-NIA-06 takes for mouth-shape prediction. Exclude voice and likeness synthesis.','Delete source copies within 30 days; delete the model by 31 December 2026. Record both deletions.','Keep the model and dataset within the named Moss & Moon team. Record lineage and stop use if consent is withdrawn pending review.');
  if(!['Sydney','Brisbane'].includes(f.location))add('restricted','The rider excludes US processing and access','Nia’s research permission limits processing and access to the named Australian team. This location falls outside those terms.',['NIA-06','TOOL-MOTION']);
 }
 const toolRecord={motion:'TOOL-MOTION',note:'TOOL-NOTE',frame:'TOOL-FRAME',studio:'TOOL-STUDIO'}[f.tool];if(toolRecord)evidence.add(toolRecord);
 if(!covered&&!['unknown','public'].includes(f.tool))add('review','Tool approval does not yet cover the full proposal','The tool’s recorded scope must match the material, operation, show, retention and access locations. IT must verify this particular use. ',[toolRecord].filter(Boolean),'Isaac Romero · IT & Security');
 if(!covered&&!reasons.some(r=>r.level==='restricted'||r.level==='review'))add('review','There is no recorded permission for this combination','A decision-maker needs to review the specific proposal against the source and contributor agreements. The prototype leaves unmatched combinations unresolved.',['POL-01']);
 const status=reasons.some(r=>r.level==='restricted')?'Restricted':reasons.some(r=>r.level==='review')?'Review required':conditions.length?'Conditional':'Approved';
 if(['Restricted','Review required'].includes(status)){owner='Leila Morgan · Business & Legal Affairs';authority='SCOPE rules identify the position; Legal owns any new determination.';expiry='A changed proposal or newly verified evidence requires a new check';}
 const headline={Approved:'You can summarise this meeting.',Conditional:f.material==='voice'?'This experiment has a defined permission.':'You can explore, within these limits.','Review required':f.source==='harbor'&&f.operation==='train'?'Hold the training. Resolve the rights first.':'A person needs to resolve the open questions.',Restricted:f.operation==='automate'?'This use is outside the studio’s policy.':'This proposal includes a recorded restriction.'}[status];
 const summary={Approved:'The confirmed scope matches a recorded permission. Keep the same material, show, workspace and retention settings.',Conditional:'A recorded permission covers this exact use. The conditions below must be met before proceeding and throughout the work.','Review required':'Keep the material out of the proposed workflow while the missing permissions and facts are resolved.',Restricted:'The proposed use cannot proceed under the current records. A new proposal must remove the restricted use or be supported by a valid change to the governing terms.'}[status];
 return {status,headline,summary,reasons,open,conditions,evidence:[...evidence],owner,authority,expiry,rulesVersion:'SCOPE sample rules 1.0',recordDate:'14 Sep 2026'};
}
