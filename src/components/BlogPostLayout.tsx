import * as React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import { Calendar, Clock, TrendingUp, AlertCircle, Lightbulb } from 'lucide-react'

interface BlogPostLayoutProps {
  title: string
  date: string
  contentHtml: string
  summary?: {
    highlights?: string[]
    stats?: { label: string; value: string }[]
  }
}

export function BlogPostLayout({
  title,
  date,
  contentHtml,
  summary,
}: BlogPostLayoutProps) {
  return (
    <article className="max-w-3xl mx-auto px-4 py-12">
      {/* Header */}
      <header className="mb-10">
        <div className="flex items-center gap-3 text-sm text-muted mb-4">
          <span className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4" />
            {date}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="w-4 h-4" />
            5 min read
          </span>
        </div>
        <h1 className="text-4xl font-bold tracking-tight mb-4">{title}</h1>
        <Separator className="bg-neutral-200" />
      </header>

      {/* Executive Summary */}
      {summary && (
        <Card className="mb-10 border-l-4 border-l-blue-500 bg-neutral-50">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm uppercase tracking-widest font-semibold flex items-center gap-2">
              <Lightbulb className="w-4 h-4" />
              At a Glance
            </CardTitle>
          </CardHeader>
          <CardContent>
            {summary.stats && summary.stats.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                {summary.stats.map((stat, idx) => (
                  <div key={idx} className="text-center">
                    <div className="text-2xl font-bold text-blue-600">
                      {stat.value}
                    </div>
                    <div className="text-xs text-muted uppercase tracking-wide">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            )}
            {summary.highlights && summary.highlights.length > 0 && (
              <ul className="space-y-2">
                {summary.highlights.map((highlight, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2 text-sm text-neutral-700"
                  >
                    <TrendingUp className="w-4 h-4 mt-0.5 text-blue-500 shrink-0" />
                    {highlight}
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      )}

      {/* Main Content */}
      <div
        className="prose-editorial"
        dangerouslySetInnerHTML={{ __html: contentHtml }}
      />
    </article>
  )
}
