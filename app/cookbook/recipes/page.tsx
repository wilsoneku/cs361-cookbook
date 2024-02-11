import CardWrapper, { Card } from '@/app/ui/dashboard/recipe-cards';
import LatestInvoices from '@/app/ui/dashboard/latest-invoices';
import { lusitana } from '@/app/ui/fonts';

export default async function Page() {
  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        My Recipes
      </h1>
      <div className="grid grid-cols-2 gap-6">
        <CardWrapper />
      </div>
    </main>
  );
}
