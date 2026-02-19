export function Footer() {
  return (
    <footer className="border-t border-border py-8 px-6">
      <div className="mx-auto max-w-4xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <span className="font-mono text-sm text-muted-foreground">
          SS<span className="text-primary">.</span>
        </span>
        <span className="text-xs text-muted-foreground">
          Built with precision. Engineered to scale.
        </span>
      </div>
    </footer>
  );
}
