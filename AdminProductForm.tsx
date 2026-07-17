"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Category = { id: string; name: string };

type ProductInput = {
  id?: string;
  name: string;
  slug: string;
  description: string;
  priceCents: number;
  imageUrl: string;
  inventory: number;
  categoryId: string | null;
  isActive: boolean;
};

export default function AdminProductForm({
  categories,
  initial,
}: {
  categories: Category[];
  initial?: ProductInput;
}) {
  const router = useRouter();
  const isEdit = Boolean(initial?.id);

  const [form, setForm] = useState<ProductInput>(
    initial || {
      name: "",
      slug: "",
      description: "",
      priceCents: 0,
      imageUrl: "",
      inventory: 0,
      categoryId: null,
      isActive: true,
    }
  );
  const [priceDollars, setPriceDollars] = useState(
    initial ? (initial.priceCents / 100).toString() : ""
  );
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const payload = {
      ...form,
      priceCents: Math.round(parseFloat(priceDollars || "0") * 100),
    };

    const res = await fetch(
      isEdit ? `/api/products/${initial!.id}` : "/api/products",
      {
        method: isEdit ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    );

    setLoading(false);
    if (!res.ok) {
      const data = await res.json();
      setError(data.error || "Something went wrong");
      return;
    }

    router.push("/admin/products");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 max-w-lg space-y-4">
      <Field label="Name">
        <input
          required
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="input"
        />
      </Field>
      <Field label="Slug (URL-friendly, unique)">
        <input
          required
          value={form.slug}
          onChange={(e) => setForm({ ...form, slug: e.target.value })}
          className="input"
        />
      </Field>
      <Field label="Description">
        <textarea
          required
          rows={4}
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="input"
        />
      </Field>
      <Field label="Price (USD)">
        <input
          required
          type="number"
          step="0.01"
          min="0"
          value={priceDollars}
          onChange={(e) => setPriceDollars(e.target.value)}
          className="input"
        />
      </Field>
      <Field label="Image URL">
        <input
          required
          type="url"
          value={form.imageUrl}
          onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
          className="input"
        />
      </Field>
      <Field label="Inventory">
        <input
          required
          type="number"
          min="0"
          value={form.inventory}
          onChange={(e) =>
            setForm({ ...form, inventory: Number(e.target.value) })
          }
          className="input"
        />
      </Field>
      <Field label="Category">
        <select
          value={form.categoryId || ""}
          onChange={(e) =>
            setForm({ ...form, categoryId: e.target.value || null })
          }
          className="input"
        >
          <option value="">None</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      </Field>
      <label className="flex items-center gap-2 font-body text-sm text-ink/70">
        <input
          type="checkbox"
          checked={form.isActive}
          onChange={(e) => setForm({ ...form, isActive: e.target.checked })}
        />
        Visible in store
      </label>

      {error && <p className="font-body text-sm text-red-600">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="rounded-sm bg-ink px-6 py-3 font-body text-sm uppercase tracking-wide text-linen hover:bg-clay-600 disabled:opacity-50"
      >
        {loading ? "Saving…" : isEdit ? "Save changes" : "Create product"}
      </button>

      <style jsx global>{`
        .input {
          margin-top: 0.25rem;
          width: 100%;
          border: 1px solid #cbd6bc;
          background: white;
          padding: 0.5rem 0.75rem;
          font-size: 0.875rem;
          border-radius: 2px;
        }
      `}</style>
    </form>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="font-body text-xs uppercase tracking-wide text-ink/60">
        {label}
      </label>
      {children}
    </div>
  );
}
