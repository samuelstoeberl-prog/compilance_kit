import jsPDF from 'jspdf'
import { Document, Packer, Paragraph, TextRun, BorderStyle } from 'docx'

function isSeparator(line: string): boolean {
  const t = line.trim()
  return t.length > 5 && /^[━─]+$/.test(t)
}

function isHeading(line: string): boolean {
  const t = line.trim()
  if (t.length < 3) return false
  return t === t.toUpperCase() && /^[A-ZÄÖÜ0-9\s.,\-()/§:]+$/.test(t)
}

function isTableRow(line: string): boolean {
  return line.includes('│') || line.includes('─') || line.includes('┼') || line.includes('┴') || line.includes('┬')
}

// jsPDF uses Latin-1 fonts — replace characters outside that range with ASCII equivalents
function sanitizeForPDF(text: string): string {
  return text
    .replace(/│/g, '|')
    .replace(/┼/g, '+')
    .replace(/┴/g, '+')
    .replace(/┬/g, '+')
    .replace(/├/g, '+')
    .replace(/┤/g, '+')
    .replace(/┐/g, '+')
    .replace(/┘/g, '+')
    .replace(/┌/g, '+')
    .replace(/└/g, '+')
    .replace(/━/g, '-')
    .replace(/─/g, '-')
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

  for (const line of content.split('\n')) {
    if (isSeparator(line)) {
      ensureSpace(5)
      doc.setDrawColor(190, 190, 190)
      doc.setLineWidth(0.25)
      doc.line(ml, y, pw - mr, y)
      y += 4
      continue
    }

    if (line.trim() === '') {
      y += 2.5
      continue
    }

    const h = isHeading(line)
    const t = isTableRow(line)
    const safe = sanitizeForPDF(line)

    if (h) {
      doc.setFont('helvetica', 'bold')
      doc.setFontSize(10)
      doc.setTextColor(20, 20, 20)
    } else if (t) {
      doc.setFont('courier', 'normal')
      doc.setFontSize(7.5)
      doc.setTextColor(40, 40, 40)
    } else {
      doc.setFont('helvetica', 'normal')
      doc.setFontSize(9)
      doc.setTextColor(50, 50, 50)
    }

    const wrapped = doc.splitTextToSize(safe, cw)
    const lh = h ? 5.5 : t ? 4.0 : 4.8

    ensureSpace(wrapped.length * lh + 1)
    doc.text(wrapped, ml, y)
    y += wrapped.length * lh
  }

  const blob = doc.output('blob')
  triggerDownload(blob, `${filename}.pdf`)
}

export async function downloadAsDOCX(content: string, filename: string): Promise<void> {
  const paragraphs: Paragraph[] = []

  for (const line of content.split('\n')) {
    if (isSeparator(line)) {
      paragraphs.push(new Paragraph({
        border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: 'BBBBBB' } },
        spacing: { before: 60, after: 60 },
        children: [],
      }))
      continue
    }

    const h = isHeading(line)
    const t = isTableRow(line)

    paragraphs.push(new Paragraph({
      children: [new TextRun({
        text: line || '',
        bold: h,
        size: h ? 22 : 18,
        font: t ? 'Courier New' : 'Arial',
        color: h ? '111111' : '333333',
      })],
      spacing: {
        before: h ? 240 : 0,
        after: h ? 80 : 40,
        line: 276,
      },
    }))
  }

  const wordDoc = new Document({
    creator: 'ComplianceKit',
    title: filename,
    sections: [{
      properties: { page: { margin: { top: 1134, right: 1134, bottom: 1134, left: 1134 } } },
      children: paragraphs,
    }],
  })

  const blob = await Packer.toBlob(wordDoc)
  triggerDownload(blob, `${filename}.docx`)
}
