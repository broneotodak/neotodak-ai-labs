import { NextRequest, NextResponse } from 'next/server'
import { isLocale } from '@/lib/portfolio/locales'

// Only the unprefixed entry point follows the visitor's saved choice.
// Explicit locale URLs always win and remain statically cacheable.
export function GET(request: NextRequest) {
  const saved = request.cookies.get('portfolio-language')?.value
  const locale = saved && isLocale(saved) ? saved : 'en'
  // A relative Location also works behind hosting proxies with an internal origin.
  const response = new NextResponse(null, { status: 302, headers: { Location: `/${locale}/${request.nextUrl.search}` } })
  response.headers.set('Cache-Control', 'private, no-store')
  response.headers.set('Vary', 'Cookie')
  return response
}
