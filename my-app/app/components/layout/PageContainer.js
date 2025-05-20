"use client";

export default function PageContainer({ children, title, description }) {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {(title || description) && (
        <header className="text-center mb-12">
          {title && <h1 className="text-3xl font-bold mb-4">{title}</h1>}
          {description && (
            <p className="text-foreground/70 max-w-2xl mx-auto">
              {description}
            </p>
          )}
        </header>
      )}
      {children}
    </div>
  );
}
