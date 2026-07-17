import Link from "next/link";
import Image from "next/image";
import { formatPrice } from "@/types";

type Props = {
  product: {
    id: string;
    name: string;
    slug: string;
    priceCents: number;
    imageUrl: string;
    inventory: number;
  };
};

export default function ProductCard({ product }: Props) {
  const outOfStock = product.inventory <= 0;

  return (
    <Link href={`/products/${product.slug}`} className="group block">
      <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-moss-100">
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          className="object-cover transition duration-500 group-hover:scale-105"
          sizes="(min-width: 768px) 25vw, 50vw"
        />
        {outOfStock && (
          <span className="absolute left-3 top-3 bg-ink px-2 py-1 text-[11px] uppercase tracking-wide text-linen">
            Sold out
          </span>
        )}
      </div>
      <div className="mt-3 flex items-baseline justify-between">
        <h3 className="font-body text-sm text-ink">{product.name}</h3>
        <span className="font-body text-sm text-ink/70">
          {formatPrice(product.priceCents)}
        </span>
      </div>
    </Link>
  );
}
