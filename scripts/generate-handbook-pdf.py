#!/usr/bin/env python3
"""Build the SlateCheck project handbook from the repository Markdown files."""

from __future__ import annotations

import html
import re
import subprocess
from datetime import date
from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import (
    BaseDocTemplate,
    Flowable,
    Frame,
    KeepTogether,
    NextPageTemplate,
    PageBreak,
    PageTemplate,
    Paragraph,
    Preformatted,
    Spacer,
    Table,
    TableStyle,
)
from reportlab.platypus.tableofcontents import TableOfContents


ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "output" / "pdf" / "SlateCheck_Project_Handbook_v0.2.pdf"

NAVY = colors.HexColor("#172B3A")
INK = colors.HexColor("#20384C")
TEAL = colors.HexColor("#008A8A")
DEEP_TEAL = colors.HexColor("#087F7A")
GOLD = colors.HexColor("#D9A441")
PALE = colors.HexColor("#EEF4F4")
GRID = colors.HexColor("#B4C5CC")
MUTED = colors.HexColor("#546A79")
WHITE = colors.white

PAGE_W, PAGE_H = A4
LEFT = 19 * mm
RIGHT = 18 * mm
TOP = 20 * mm
BOTTOM = 18 * mm
CONTENT_W = PAGE_W - LEFT - RIGHT

SOURCES = [
    ("Project overview", "README.md"),
    ("Minimum-overhead profile", "docs/MINIMUM_OVERHEAD_PROFILE.md"),
    ("Minimum-overhead routine-use record", "examples/minimum-overhead-routine-use.md"),
    ("Framework", "docs/FRAMEWORK.md"),
    ("Assessment checklist specification", "docs/ASSESSMENT_CHECKLIST.md"),
    ("Governance model", "docs/GOVERNANCE.md"),
    ("Decision specification", "docs/DECISION_SPECIFICATION.md"),
    ("Data model", "docs/DATA_MODEL.md"),
    ("Implementation specification", "docs/IMPLEMENTATION_SPECIFICATION.md"),
    ("Conformance and validation", "docs/CONFORMANCE.md"),
    ("Worked scenarios", "docs/SCENARIOS.md"),
    ("Interoperability and references", "docs/INTEROPERABILITY.md"),
    ("Comparative pilot protocol", "docs/PILOT_EVALUATION.md"),
    ("Five-case usability smoke pilot", "pilot/README.md"),
    ("Usability smoke pilot results template", "pilot/RESULTS.md"),
    ("Migration from 0.1 to 0.2", "docs/MIGRATION_0.2.md"),
    ("Licensing", "LICENSE.md"),
    ("Name and branding", "TRADEMARKS.md"),
    ("Publication review", "docs/PUBLICATION_REVIEW.md"),
    ("Glossary", "docs/GLOSSARY.md"),
]


def register_fonts() -> None:
    paths = {
        "Body": "/System/Library/Fonts/Supplemental/Georgia.ttf",
        "BodyBold": "/System/Library/Fonts/Supplemental/Georgia Bold.ttf",
        "BodyItalic": "/System/Library/Fonts/Supplemental/Georgia Italic.ttf",
        "Sans": "/System/Library/Fonts/Supplemental/Arial.ttf",
        "SansBold": "/System/Library/Fonts/Supplemental/Arial Bold.ttf",
        "SansItalic": "/System/Library/Fonts/Supplemental/Arial Italic.ttf",
        "Mono": "/System/Library/Fonts/Menlo.ttc",
    }
    for name, path in paths.items():
        try:
            pdfmetrics.registerFont(TTFont(name, path, subfontIndex=0))
        except Exception:
            fallback = {
                "Body": "Times-Roman",
                "BodyBold": "Times-Bold",
                "BodyItalic": "Times-Italic",
                "Sans": "Helvetica",
                "SansBold": "Helvetica-Bold",
                "SansItalic": "Helvetica-Oblique",
                "Mono": "Courier",
            }[name]
            pdfmetrics.registerFont(TTFont(name, path)) if Path(path).suffix == ".ttf" else None
            if name not in pdfmetrics.getRegisteredFontNames():
                pdfmetrics.registerFontFamily(name, normal=fallback)

    pdfmetrics.registerFontFamily("Body", normal="Body", bold="BodyBold", italic="BodyItalic")
    pdfmetrics.registerFontFamily("Sans", normal="Sans", bold="SansBold", italic="SansItalic")


def styles() -> dict[str, ParagraphStyle]:
    base = getSampleStyleSheet()
    return {
        "body": ParagraphStyle(
            "BodyTextCustom",
            parent=base["BodyText"],
            fontName="Body",
            fontSize=9.3,
            leading=13.2,
            textColor=NAVY,
            spaceAfter=7,
            allowWidows=0,
            allowOrphans=0,
        ),
        "chapter_label": ParagraphStyle(
            "ChapterLabel",
            fontName="Sans",
            fontSize=8,
            leading=10,
            textColor=TEAL,
            spaceAfter=7,
        ),
        "chapter": ParagraphStyle(
            "ChapterTitle",
            fontName="BodyBold",
            fontSize=23,
            leading=27,
            textColor=NAVY,
            spaceAfter=8,
            keepWithNext=True,
        ),
        "h2": ParagraphStyle(
            "SectionHeading",
            fontName="BodyBold",
            fontSize=15.5,
            leading=19,
            textColor=NAVY,
            spaceBefore=11,
            spaceAfter=6,
            keepWithNext=True,
        ),
        "h3": ParagraphStyle(
            "SubHeading",
            fontName="SansBold",
            fontSize=10.8,
            leading=14,
            textColor=DEEP_TEAL,
            spaceBefore=9,
            spaceAfter=4,
            keepWithNext=True,
        ),
        "h4": ParagraphStyle(
            "MinorHeading",
            fontName="SansBold",
            fontSize=9.2,
            leading=12,
            textColor=INK,
            spaceBefore=7,
            spaceAfter=3,
            keepWithNext=True,
        ),
        "small": ParagraphStyle(
            "Small",
            fontName="Sans",
            fontSize=7.5,
            leading=10,
            textColor=INK,
        ),
        "small_bold": ParagraphStyle(
            "SmallBold",
            fontName="SansBold",
            fontSize=7.5,
            leading=10,
            textColor=INK,
        ),
        "quote": ParagraphStyle(
            "Quote",
            fontName="Body",
            fontSize=10,
            leading=14,
            leftIndent=10,
            rightIndent=8,
            borderColor=TEAL,
            borderWidth=2,
            borderPadding=(7, 9, 7, 10),
            backColor=PALE,
            textColor=INK,
            spaceBefore=4,
            spaceAfter=8,
        ),
        "list": ParagraphStyle(
            "ListItemCustom",
            fontName="Body",
            fontSize=9.3,
            leading=13.2,
            textColor=NAVY,
            leftIndent=15,
            firstLineIndent=-14,
            spaceAfter=3,
            allowWidows=0,
            allowOrphans=0,
        ),
        "code": ParagraphStyle(
            "Code",
            fontName="Mono",
            fontSize=6.8,
            leading=9.2,
            leftIndent=7,
            rightIndent=7,
            borderColor=GRID,
            borderWidth=0.5,
            borderPadding=7,
            backColor=colors.HexColor("#F4F6F7"),
            textColor=INK,
            spaceBefore=3,
            spaceAfter=8,
        ),
        "toc_title": ParagraphStyle(
            "TOCTitle",
            fontName="BodyBold",
            fontSize=24,
            leading=28,
            textColor=NAVY,
            spaceAfter=18,
        ),
    }


def clean_text(value: str) -> str:
    return (
        value.replace("\u2011", "-")
        .replace("\u2012", "-")
        .replace("\u2013", "-")
        .replace("\u2014", "-")
        .replace("\u2212", "-")
        .replace("\u00a0", " ")
    )


def inline_markup(value: str) -> str:
    text = html.escape(clean_text(value), quote=False)
    text = re.sub(
        r"\[([^\]]+)\]\(([^)]+)\)",
        lambda m: f'<a href="{html.escape(m.group(2), quote=True)}" color="#008A8A"><u>{m.group(1)}</u></a>',
        text,
    )
    text = re.sub(r"`([^`]+)`", r'<font name="Mono" size="7.8">\1</font>', text)
    text = re.sub(r"\*\*([^*]+)\*\*", r"<b>\1</b>", text)
    text = re.sub(r"(?<!\*)\*([^*]+)\*(?!\*)", r"<i>\1</i>", text)
    return text


def table_flowable(rows: list[list[str]], style_map: dict[str, ParagraphStyle]) -> Table:
    column_count = max(len(row) for row in rows)
    normalized = [row + [""] * (column_count - len(row)) for row in rows]
    lengths = []
    for col in range(column_count):
        longest = max(len(re.sub(r"[`*_\[\]]", "", row[col])) for row in normalized)
        lengths.append(max(8, min(longest, 36)))
    if column_count >= 6:
        widths = [CONTENT_W / column_count] * column_count
        font_style = ParagraphStyle("TinyTable", parent=style_map["small"], fontSize=5.8, leading=7.2)
    else:
        total = sum(lengths)
        widths = [CONTENT_W * length / total for length in lengths]
        min_width = 24 * mm if column_count <= 3 else 16 * mm
        widths = [max(min_width, width) for width in widths]
        scale = CONTENT_W / sum(widths)
        widths = [width * scale for width in widths]
        font_style = style_map["small"]

    data = []
    for row_index, row in enumerate(normalized):
        cell_style = style_map["small_bold"] if row_index == 0 else font_style
        data.append([Paragraph(inline_markup(cell.strip()), cell_style) for cell in row])

    table = Table(data, colWidths=widths, repeatRows=1, hAlign="LEFT", splitByRow=1)
    table.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, 0), colors.HexColor("#E4EEF2")),
                ("TEXTCOLOR", (0, 0), (-1, -1), INK),
                ("GRID", (0, 0), (-1, -1), 0.45, GRID),
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("LEFTPADDING", (0, 0), (-1, -1), 5),
                ("RIGHTPADDING", (0, 0), (-1, -1), 5),
                ("TOPPADDING", (0, 0), (-1, -1), 4),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 4),
            ]
        )
    )
    return table


def is_table_separator(line: str) -> bool:
    cells = [cell.strip() for cell in line.strip().strip("|").split("|")]
    return bool(cells) and all(re.fullmatch(r":?-{3,}:?", cell) for cell in cells)


def is_block_start(lines: list[str], index: int) -> bool:
    line = lines[index]
    stripped = line.strip()
    if not stripped:
        return True
    if re.match(r"^#{1,6}\s+", line) or stripped.startswith("```") or stripped.startswith(">"):
        return True
    if re.match(r"^\s*[-*+]\s+", line) or re.match(r"^\s*\d+\.\s+", line):
        return True
    if index + 1 < len(lines) and "|" in line and is_table_separator(lines[index + 1]):
        return True
    return False


def markdown_story(path: Path, style_map: dict[str, ParagraphStyle]) -> list[Flowable]:
    lines = path.read_text(encoding="utf-8").splitlines()
    output: list[Flowable] = []
    index = 0

    if lines and lines[0].startswith("# "):
        index = 1

    while index < len(lines):
        line = lines[index]
        stripped = line.strip()
        if not stripped:
            index += 1
            continue

        heading = re.match(r"^(#{2,6})\s+(.+)$", line)
        if heading:
            level = len(heading.group(1))
            style = style_map["h2"] if level == 2 else style_map["h3"] if level == 3 else style_map["h4"]
            output.append(Paragraph(inline_markup(heading.group(2)), style))
            index += 1
            continue

        if stripped.startswith("```"):
            index += 1
            code_lines = []
            while index < len(lines) and not lines[index].strip().startswith("```"):
                code_lines.append(clean_text(lines[index]))
                index += 1
            if index < len(lines):
                index += 1
            output.append(Preformatted("\n".join(code_lines), style_map["code"], maxLineLength=95))
            continue

        if index + 1 < len(lines) and "|" in line and is_table_separator(lines[index + 1]):
            table_lines = [line]
            index += 2
            while index < len(lines) and "|" in lines[index] and lines[index].strip():
                table_lines.append(lines[index])
                index += 1
            rows = [
                [cell.strip() for cell in table_line.strip().strip("|").split("|")]
                for table_line in table_lines
            ]
            output.extend([table_flowable(rows, style_map), Spacer(1, 7)])
            continue

        if stripped.startswith(">"):
            quote_lines = []
            while index < len(lines) and lines[index].strip().startswith(">"):
                quote_lines.append(lines[index].strip()[1:].strip())
                index += 1
            output.append(Paragraph(inline_markup(" ".join(quote_lines)), style_map["quote"]))
            continue

        bullet = re.match(r"^\s*[-*+]\s+(.+)$", line)
        numbered = re.match(r"^\s*(\d+)\.\s+(.+)$", line)
        if bullet or numbered:
            ordered = numbered is not None
            counter = int(numbered.group(1)) if numbered else 1
            pattern = r"^\s*\d+\.\s+(.+)$" if ordered else r"^\s*[-*+]\s+(.+)$"
            while index < len(lines):
                match = re.match(pattern, lines[index])
                if not match:
                    break
                marker = f"{counter}." if ordered else "-"
                output.append(Paragraph(f"{marker}&nbsp;&nbsp;{inline_markup(match.group(1))}", style_map["list"]))
                counter += 1
                index += 1
            output.append(Spacer(1, 3))
            continue

        paragraph_lines = [stripped]
        index += 1
        while index < len(lines) and not is_block_start(lines, index):
            paragraph_lines.append(lines[index].strip())
            index += 1
        output.append(Paragraph(inline_markup(" ".join(paragraph_lines)), style_map["body"]))

    return output


class CoverPage(Flowable):
    def __init__(self, compiled: str):
        super().__init__()
        self.width = PAGE_W
        self.height = PAGE_H
        self.compiled = compiled

    def draw(self) -> None:
        canvas = self.canv
        canvas.saveState()
        canvas.setFillColor(NAVY)
        canvas.rect(0, 0, PAGE_W, PAGE_H, fill=1, stroke=0)
        canvas.setFillColor(colors.HexColor("#13847F"))
        canvas.rect(0, 0, 18 * mm, PAGE_H, fill=1, stroke=0)
        canvas.setFillColor(GOLD)
        canvas.rect(18 * mm, 0, 3.5 * mm, PAGE_H, fill=1, stroke=0)

        x = 27 * mm
        canvas.setFont("Sans", 8)
        canvas.setFillColor(colors.HexColor("#14A4A0"))
        canvas.drawString(x, PAGE_H - 57 * mm, "SLATECHECK")
        canvas.drawRightString(PAGE_W - 28 * mm, PAGE_H - 57 * mm, "VERSION 0.2.0")

        title = Paragraph(
            "Rights-Aware AI<br/>Governance<br/>for Creative Production",
            ParagraphStyle("CoverTitle", fontName="BodyBold", fontSize=31, leading=36, textColor=WHITE),
        )
        title.wrapOn(canvas, PAGE_W - x - 25 * mm, 120 * mm)
        title.drawOn(canvas, x, PAGE_H - 132 * mm)
        canvas.setStrokeColor(GOLD)
        canvas.setLineWidth(2)
        canvas.line(x, PAGE_H - 139 * mm, x + 64 * mm, PAGE_H - 139 * mm)

        canvas.setFont("Body", 16)
        canvas.setFillColor(colors.HexColor("#DCE7EA"))
        canvas.drawString(x, PAGE_H - 160 * mm, "Project handbook")
        canvas.setFont("Sans", 9)
        canvas.drawString(x, 60 * mm, "Author: Ben Gunsberger")
        canvas.drawString(x, 53 * mm, f"Working draft compiled {self.compiled}")
        canvas.restoreState()


class HandbookDocTemplate(BaseDocTemplate):
    def afterFlowable(self, flowable: Flowable) -> None:
        if isinstance(flowable, Paragraph) and flowable.style.name == "ChapterTitle":
            text = flowable.getPlainText()
            key = f"chapter-{self.seq.nextf('chapter')}"
            self.canv.bookmarkPage(key)
            self.canv.addOutlineEntry(text, key, 0, False)
            self.notify("TOCEntry", (0, text, self.page - 1, key))


def cover_page(canvas, doc) -> None:
    canvas.setTitle("SlateCheck Project Handbook v0.2")
    canvas.setAuthor("Ben Gunsberger")
    canvas.setCreator("SlateCheck repository documentation")
    canvas.setSubject("Rights-Aware AI Governance for Creative Production")


def body_page(canvas, doc) -> None:
    page_number = canvas.getPageNumber() - 1
    canvas.saveState()
    canvas.setStrokeColor(GRID)
    canvas.setLineWidth(0.5)
    canvas.line(LEFT, PAGE_H - 15 * mm, PAGE_W - RIGHT, PAGE_H - 15 * mm)
    canvas.setFont("Sans", 6.8)
    canvas.setFillColor(MUTED)
    canvas.drawString(LEFT, PAGE_H - 11.5 * mm, "SLATECHECK  /  PROJECT HANDBOOK")
    canvas.drawRightString(PAGE_W - RIGHT, PAGE_H - 11.5 * mm, "SlateCheck")
    canvas.drawString(LEFT, 9.5 * mm, "Version 0.2.0  -  Working draft")
    canvas.drawRightString(PAGE_W - RIGHT, 9.5 * mm, str(page_number))
    canvas.restoreState()


def chapter_intro(number: int, title: str, source: str, style_map: dict[str, ParagraphStyle]) -> list[Flowable]:
    label = Paragraph(f"CHAPTER {number:02d} / {source.upper()}", style_map["chapter_label"])
    heading = Paragraph(html.escape(title), style_map["chapter"])
    rule = Table([[""]], colWidths=[46 * mm], rowHeights=[1.2])
    rule.setStyle(TableStyle([("BACKGROUND", (0, 0), (-1, -1), GOLD)]))
    return [label, heading, rule, Spacer(1, 7 * mm)]


def build() -> None:
    register_fonts()
    style_map = styles()
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    compiled = date.today().strftime("%-d %B %Y")

    doc = HandbookDocTemplate(
        str(OUTPUT),
        pagesize=A4,
        leftMargin=LEFT,
        rightMargin=RIGHT,
        topMargin=TOP,
        bottomMargin=BOTTOM,
        title="SlateCheck Project Handbook v0.2",
        author="Ben Gunsberger",
        subject="Rights-Aware AI Governance for Creative Production",
    )
    cover_frame = Frame(0, 0, PAGE_W, PAGE_H, leftPadding=0, rightPadding=0, topPadding=0, bottomPadding=0, id="cover")
    body_frame = Frame(LEFT, BOTTOM, CONTENT_W, PAGE_H - TOP - BOTTOM, id="body")
    doc.addPageTemplates(
        [
            PageTemplate(id="cover", frames=[cover_frame], onPage=cover_page),
            PageTemplate(id="body", frames=[body_frame], onPage=body_page),
        ]
    )

    story: list[Flowable] = [CoverPage(compiled), NextPageTemplate("body"), PageBreak()]

    story.extend(
        [
            Paragraph("About this edition", style_map["chapter"]),
            Paragraph(
                "This handbook compiles the canonical SlateCheck project documentation into a single reviewable volume. The minimum-overhead profile appears immediately after the project overview so readers encounter the practical adoption path before the full specification.",
                style_map["body"],
            ),
            Table(
                [
                    [Paragraph("Status", style_map["small_bold"]), Paragraph("Version 0.2.0 - working draft for review and controlled pilot evaluation", style_map["small"])],
                    [Paragraph("Pilot", style_map["small_bold"]), Paragraph("The five-case usability pilot has not yet started; effectiveness and operating cost remain untested", style_map["small"])],
                    [Paragraph("Routine path", style_map["small_bold"]), Paragraph("Assess once, then use a five-question confirmation while the standing approval remains current and unchanged", style_map["small"])],
                    [Paragraph("Authority", style_map["small_bold"]), Paragraph("SlateCheck supports organisational decisions and supplies no legal advice or permission by itself", style_map["small"])],
                    [Paragraph("Source", style_map["small_bold"]), Paragraph(f"Repository working draft compiled {compiled}", style_map["small"])],
                ],
                colWidths=[31 * mm, CONTENT_W - 31 * mm],
                style=TableStyle(
                    [
                        ("BACKGROUND", (0, 0), (0, -1), colors.HexColor("#E4EEF2")),
                        ("GRID", (0, 0), (-1, -1), 0.45, GRID),
                        ("VALIGN", (0, 0), (-1, -1), "TOP"),
                        ("LEFTPADDING", (0, 0), (-1, -1), 6),
                        ("RIGHTPADDING", (0, 0), (-1, -1), 6),
                        ("TOPPADDING", (0, 0), (-1, -1), 6),
                        ("BOTTOMPADDING", (0, 0), (-1, -1), 6),
                    ]
                ),
            ),
            PageBreak(),
            Paragraph("Contents", style_map["toc_title"]),
        ]
    )

    toc = TableOfContents()
    toc.levelStyles = [
        ParagraphStyle(
            "TOCLevel0",
            fontName="BodyBold",
            fontSize=10.5,
            leading=15,
            leftIndent=0,
            firstLineIndent=0,
            textColor=NAVY,
            spaceBefore=2,
        )
    ]
    story.extend([toc, PageBreak()])

    for number, (title, relative_path) in enumerate(SOURCES, start=1):
        if number > 1:
            story.append(PageBreak())
        story.extend(chapter_intro(number, title, relative_path, style_map))
        story.extend(markdown_story(ROOT / relative_path, style_map))

    doc.multiBuild(story)


if __name__ == "__main__":
    build()
