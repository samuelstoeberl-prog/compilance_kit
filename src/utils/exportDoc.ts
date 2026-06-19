import jsPDF from 'jspdf'
import { Document, Packer, Paragraph, TextRun, BorderStyle, Table, TableRow, TableCell, WidthType } from 'docx'

function isSeparator(line: string): boolean {
  const t = line.trim()
  return t.length > 5 && /^[━─]+$/.test(t)
}

function isHeading(line: string): boolean {
  const t = line.trim()
  if (t.length < 3) return false
  return t === t.toUpperCase() && /^[A-ZÄÖÜ0-9\s.,\-()/§:]+$/.test(t)
}

const TABLE_START = '[[TABLE]]'
const TABLE_END = '[[/TABLE]]'

function parseTableRow(line: string): string[] {
  return line.split('|').map(c => c.trim())
}

// jsPDF uses Latin-1 fonts — replace characters outside that range with ASCII equivalents
function sanitizeForPDF(text: string): string {
  return text
    .replace(/€/g, 'EUR')
    .replace(/✓/g, '[x]')
    .replace(/✦/g, '*')
    .replace(/•/g, '-')
}

function triggerDownload(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  // Delay revoke so browser has time to start the download
  setTimeout(() => URL.revokeObjectURL(url), 1000)
}

export function downloadAsPDF(content: string, filename: string): void {
  const doc = new jsPDF({ unit: 'mm', format: 'a4' })

  const ml = 20, mr = 20, mt = 25, mb = 20
  const pw = doc.internal.pageSize.getWidth()
  const ph = doc.internal.pageSize.getHeight()
  const cw = pw - ml - mr
  let y = mt

  const addPage = () => { doc.addPage(); y = mt }
  const ensureSpace = (h: number) => { if (y + h > ph - mb) addPage() }

  const drawTableRow = (cells: string[], colWidths: number[], rowHeight: number, isHeader: boolean) => {
    ensureSpace(rowHeight)
    if (isHeader) {
      doc.setFillColor(230, 230, 230)
      doc.rect(ml, y, cw, rowHeight, 'F')
      doc.setFont('helvetica', 'bold')
    } else {
      doc.setFont('helvetica', 'normal')
    }
    doc.setFontSize(7.5)
    doc.setTextColor(40, 40, 40)
    doc.setDrawColor(180, 180, 180)
    doc.setLineWidth(0.1)
    let cx = ml
    for (let i = 0; i < cells.length; i++) {
      doc.rect(cx, y, colWidths[i], rowHeight)
      doc.text(sanitizeForPDF(cells[i]), cx + 1.5, y + rowHeight / 2 + 1)
      cx += colWidths[i]
    }
    y += rowHeight
  }

  const lines = content.split('\n')
  let i = 0
  while (i < lines.length) {
    const line = lines[i]

    if (line.trim() === TABLE_START) {
      const tableLines: string[] = []
      i++
      while (i < lines.length && lines[i].trim() !== TABLE_END) {
        tableLines.push(lines[i])
        i++
      }
      i++ // skip TABLE_END

      const rows = tableLines.map(parseTableRow)
      if (rows.length > 0) {
        const ncols = rows[0].length
        const colWidths = Array(ncols).fill(cw / ncols)
        const rowHeight = 6.5

        drawTableRow(rows[0], colWidths, rowHeight, true)
        for (let r = 1; r < rows.length; r++) {
          drawTableRow(rows[r], colWidths, rowHeight, false)
        }
        y += 4
      }
      continue
    }

    if (isSeparator(line)) {
      ensureSpace(5)
      doc.setDrawColor(190, 190, 190)
      doc.setLineWidth(0.25)
      doc.line(ml, y, pw - mr, y)
      y += 4
      i++
      continue
    }

    if (line.trim() === '') {
      y += 2.5
      i++
      continue
    }

    const h = isHeading(line)
    const safe = sanitizeForPDF(line)

    if (h) {
      doc.setFont('helvetica', 'bold')
      doc.setFontSize(10)
      doc.setTextColor(20, 20, 20)
    } else {
      doc.setFont('helvetica', 'normal')
      doc.setFontSize(9)
      doc.setTextColor(50, 50, 50)
    }

    const wrapped = doc.splitTextToSize(safe, cw)
    const lh = h ? 5.5 : 4.8

    ensureSpace(wrapped.length * lh + 1)
    doc.text(wrapped, ml, y)
    y += wrapped.length * lh
    i++
  }

  const blob = doc.output('blob')
  triggerDownload(blob, `${filename}.pdf`)
}

export async function downloadAsDOCX(content: string, filename: string): Promise<void> {
  const elements: (Paragraph | Table)[] = []

  const lines = content.split('\n')
  let i = 0
  while (i < lines.length) {
    const line = lines[i]

    if (line.trim() === TABLE_START) {
      const tableLines: string[] = []
      i++
      while (i < lines.length && lines[i].trim() !== TABLE_END) {
        tableLines.push(lines[i])
        i++
      }
      i++ // skip TABLE_END

      const rows = tableLines.map(parseTableRow)
      if (rows.length > 0) {
        const ncols = rows[0].length
        const colWidthPct = Math.floor(100 / ncols)

        elements.push(new Table({
          width: { size: 100, type: WidthType.PERCENTAGE },
          rows: rows.map((cells, ri) => new TableRow({
            children: cells.map(c => new TableCell({
              width: { size: colWidthPct, type: WidthType.PERCENTAGE },
              shading: ri === 0 ? { fill: 'E5E5E5' } : undefined,
              margins: { top: 40, bottom: 40, left: 60, right: 60 },
              children: [new Paragraph({
                children: [new TextRun({ text: c, bold: ri === 0, size: 16, font: 'Arial' })],
              })],
            })),
          })),
        }))
        elements.push(new Paragraph({ text: '', spacing: { after: 80 } }))
      }
      continue
    }

    if (isSeparator(line)) {
      elements.push(new Paragraph({
        border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: 'BBBBBB' } },
        spacing: { before: 60, after: 60 },
        children: [],
      }))
      i++
      continue
    }

    const h = isHeading(line)

    elements.push(new Paragraph({
      children: [new TextRun({
        text: line || '',
        bold: h,
        size: h ? 22 : 18,
        font: 'Arial',
        color: h ? '111111' : '333333',
      })],
      spacing: {
        before: h ? 240 : 0,
        after: h ? 80 : 40,
        line: 276,
      },
    }))
    i++
  }

  const wordDoc = new Document({
    creator: 'ComplianceKit',
    title: filename,
    sections: [{
      properties: { page: { margin: { top: 1134, right: 1134, bottom: 1134, left: 1134 } } },
      children: elements,
    }],
  })

  const blob = await Packer.toBlob(wordDoc)
  triggerDownload(blob, `${filename}.docx`)
}
