export default function Footer() {
  return (
    <footer className="mt-24 border-t border-moss-200/60 bg-moss-900 py-12 text-moss-100">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <p className="font-display text-xl text-white">Field &amp; Fern</p>
            <p className="mt-2 max-w-xs text-sm text-moss-200">
              Small-batch goods for the home, kitchen, and garden — made to
              last, not to trend.
            </p>
          </div>
          <div>
            <p className="text-sm font-semibold text-white">Shop</p>
            <ul className="mt-3 space-y-2 text-sm text-moss-200">
              <li>Home Goods</li>
              <li>Kitchen</li>
              <li>Garden</li>
            </ul>
          </div>
          <div>
            <p className="text-sm font-semibold text-white">Info</p>
            <ul className="mt-3 space-y-2 text-sm text-moss-200">
              <li>Shipping &amp; Returns</li>
              <li>Contact</li>
            </ul>
          </div>
        </div>
        <p className="mt-10 text-xs text-moss-300">
          © {new Date().getFullYear()} Field &amp; Fern. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
