// apps/frontend/src/app/theme-preview/page.tsx
'use client'; // Necessário para o ThemeToggleButton

import { ThemeToggleButton } from '@/components/theme-toggle-button'; // Botão que já criamos
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator'; // Pode precisar adicionar: pnpm dlx shadcn@latest add separator

export default function ThemePreviewPage() {
  return (
    <div className="container mx-auto py-8 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Preview do Tema</h1>
        <ThemeToggleButton />
      </div>

      <p className="text-muted-foreground">
        Use esta página para visualizar o efeito das mudanças nas variáveis CSS
        em{' '}
        <code className="font-mono bg-muted px-1 rounded">
          src/app/globals.css
        </code>
        . Alterne entre tema claro e escuro usando o botão acima.
      </p>

      <Separator />

      {/* Grupo de Cores Base */}
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <h2 className="text-xl font-semibold mb-3">Base</h2>
          <div className="space-y-4">
            {/* Background / Foreground */}
            <div>
              <h3 className="mb-1 font-medium">Background / Foreground</h3>
              <p className="text-xs text-muted-foreground mb-2">
                CSS Vars: <code className="font-mono">--background</code> /{' '}
                <code className="font-mono">--foreground</code>
                <br />
                Classes: <code className="font-mono">bg-background</code>,{' '}
                <code className="font-mono">text-foreground</code>
              </p>
              <div className="p-4 rounded-lg bg-background border border-border">
                <p className="text-foreground">
                  Texto principal (foreground) sobre fundo principal
                  (background).
                </p>
              </div>
            </div>
            {/* Card / Card Foreground */}
            <div>
              <h3 className="mb-1 font-medium">Card / Card Foreground</h3>
              <p className="text-xs text-muted-foreground mb-2">
                CSS Vars: <code className="font-mono">--card</code> /{' '}
                <code className="font-mono">--card-foreground</code>
                <br />
                Classes: <code className="font-mono">bg-card</code>,{' '}
                <code className="font-mono">text-card-foreground</code>
              </p>
              <Card>
                {' '}
                {/* Usa bg-card por padrão */}
                <CardHeader>
                  <CardTitle className="text-card-foreground">
                    Título Card
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-card-foreground">
                    Conteúdo do card (card-foreground).
                  </p>
                </CardContent>
              </Card>
            </div>
            {/* Popover / Popover Foreground */}
            <div>
              <h3 className="mb-1 font-medium">Popover / Popover Foreground</h3>
              <p className="text-xs text-muted-foreground mb-2">
                CSS Vars: <code className="font-mono">--popover</code> /{' '}
                <code className="font-mono">--popover-foreground</code>
                <br />
                Classes: <code className="font-mono">bg-popover</code>,{' '}
                <code className="font-mono">text-popover-foreground</code>
              </p>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline">Abrir Popover</Button>
                </PopoverTrigger>
                <PopoverContent className="w-60 bg-popover border-border">
                  {' '}
                  {/* Usa bg-popover */}
                  <p className="text-popover-foreground">
                    Conteúdo do popover (popover-foreground).
                  </p>
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </div>

        {/* Grupo de Cores Semânticas */}
        <div>
          <h2 className="text-xl font-semibold mb-3">Cores Semânticas</h2>
          <div className="space-y-4">
            {/* Primary */}
            <div>
              <h3 className="mb-1 font-medium">Primary / Primary Foreground</h3>
              <p className="text-xs text-muted-foreground mb-2">
                CSS Vars: <code className="font-mono">--primary</code> /{' '}
                <code className="font-mono">--primary-foreground</code>
                <br />
                Classes: <code className="font-mono">bg-primary</code>,{' '}
                <code className="font-mono">text-primary-foreground</code>
              </p>
              <div className="p-4 rounded-lg bg-primary border border-border">
                <p className="text-primary-foreground mb-2">
                  Texto (primary-foreground) sobre fundo (primary).
                </p>
                <Button size="sm">Botão Default (Primary)</Button>
              </div>
            </div>
            {/* Secondary */}
            <div>
              <h3 className="mb-1 font-medium">
                Secondary / Secondary Foreground
              </h3>
              <p className="text-xs text-muted-foreground mb-2">
                CSS Vars: <code className="font-mono">--secondary</code> /{' '}
                <code className="font-mono">--secondary-foreground</code>
                <br />
                Classes: <code className="font-mono">bg-secondary</code>,{' '}
                <code className="font-mono">text-secondary-foreground</code>
              </p>
              <div className="p-4 rounded-lg bg-secondary border border-border">
                <p className="text-secondary-foreground mb-2">
                  Texto (secondary-foreground) sobre fundo (secondary).
                </p>
                <Button variant="secondary" size="sm">
                  Botão Secondary
                </Button>
              </div>
            </div>
            {/* Muted */}
            <div>
              <h3 className="mb-1 font-medium">Muted / Muted Foreground</h3>
              <p className="text-xs text-muted-foreground mb-2">
                CSS Vars: <code className="font-mono">--muted</code> /{' '}
                <code className="font-mono">--muted-foreground</code>
                <br />
                Classes: <code className="font-mono">bg-muted</code>,{' '}
                <code className="font-mono">text-muted-foreground</code>
              </p>
              <div className="p-4 rounded-lg bg-muted border border-border">
                <p className="text-muted-foreground">
                  Texto (muted-foreground) sobre fundo (muted).
                </p>
                {/* Ex: Usado no Footer */}
              </div>
            </div>
            {/* Accent */}
            <div>
              <h3 className="mb-1 font-medium">Accent / Accent Foreground</h3>
              <p className="text-xs text-muted-foreground mb-2">
                CSS Vars: <code className="font-mono">--accent</code> /{' '}
                <code className="font-mono">--accent-foreground</code>
                <br />
                Classes: <code className="font-mono">bg-accent</code>,{' '}
                <code className="font-mono">text-accent-foreground</code>
              </p>
              <div className="p-4 rounded-lg bg-accent border border-border">
                <p className="text-accent-foreground">
                  Texto (accent-foreground) sobre fundo (accent).
                </p>
                {/* Usado em foco, seleção etc */}
              </div>
            </div>
            {/* Destructive */}
            <div>
              <h3 className="mb-1 font-medium">
                Destructive / Destructive Foreground
              </h3>
              <p className="text-xs text-muted-foreground mb-2">
                CSS Vars: <code className="font-mono">--destructive</code> /{' '}
                <code className="font-mono">--destructive-foreground</code>?
                <br />
                Classes: <code className="font-mono">bg-destructive</code>,{' '}
                <code className="font-mono">text-destructive-foreground</code>?
              </p>
              <div className="p-4 rounded-lg bg-destructive border border-border">
                {/* Shadcn pode não definir --destructive-foreground por padrão, texto pode precisar ser claro/escuro manualmente */}
                <p className="text-white dark:text-black mb-2">
                  Texto sobre fundo destrutivo.
                </p>
                <Button variant="destructive" size="sm">
                  Botão Destructive
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Separator />

      {/* Grupo de UI Elements */}
      <div>
        <h2 className="text-xl font-semibold mb-3">Elementos UI</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {/* Border */}
          <div>
            <h3 className="mb-1 font-medium">Border</h3>
            <p className="text-xs text-muted-foreground mb-2">
              CSS Var: <code className="font-mono">--border</code>, Classe:{' '}
              <code className="font-mono">border-border</code>
            </p>
            <div className="p-4 rounded-lg border-2 border-border bg-card">
              Elemento com borda
            </div>
          </div>
          {/* Input */}
          <div>
            <h3 className="mb-1 font-medium">Input Background</h3>
            <p className="text-xs text-muted-foreground mb-2">
              CSS Var: <code className="font-mono">--input</code>, Classe:{' '}
              <code className="font-mono">bg-input</code> (ou no style base do
              Input)
            </p>
            <Input placeholder="Campo de Input" className="bg-input" />{' '}
            {/* Forçando bg-input para visualização */}
          </div>
          {/* Ring */}
          <div>
            <h3 className="mb-1 font-medium">Ring (Focus)</h3>
            <p className="text-xs text-muted-foreground mb-2">
              CSS Var: <code className="font-mono">--ring</code>, Classe:{' '}
              <code className="font-mono">focus-visible:ring-ring</code>
            </p>
            <Button
              variant="outline"
              className="focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ring-offset-background"
            >
              Clique e veja o Ring
            </Button>
          </div>
        </div>
      </div>

      <Separator />

      {/* Grupo de Radius */}
      <div>
        <h2 className="text-xl font-semibold mb-3">Radius</h2>
        <p className="text-xs text-muted-foreground mb-2">
          Classes: <code className="font-mono">rounded-sm</code>,{' '}
          <code className="font-mono">rounded-md</code>,{' '}
          <code className="font-mono">rounded-lg (default)</code>,{' '}
          <code className="font-mono">rounded-xl</code>
          <br />
          Variáveis baseadas em <code className="font-mono">--radius</code>
        </p>
        <div className="flex space-x-2">
          <div
            className="w-12 h-12 bg-primary rounded-sm"
            title="rounded-sm"
          ></div>
          <div
            className="w-12 h-12 bg-primary rounded-md"
            title="rounded-md"
          ></div>
          <div
            className="w-12 h-12 bg-primary rounded-lg"
            title="rounded-lg"
          ></div>
          <div
            className="w-12 h-12 bg-primary rounded-xl"
            title="rounded-xl"
          ></div>
        </div>
      </div>

      {/* Você pode adicionar seções para --chart-* e --sidebar-* se planeja usá-los */}
    </div>
  );
}
