import Link from 'next/link';
import { Button } from '@/app/ui/button';

export default function Form() {
  return (
    <form>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Recipe Name */}
        <div className="mb-4">
          <label
            htmlFor="recipe-name"
            className="mb-2 block text-sm font-medium"
          >
            Recipe Name:
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="amount"
                name="amount"
                step="0.01"
                placeholder="Enter recipe name..."
                className="peer block w-full rounded-md border border-gray-200 py-2 text-sm outline-2 placeholder:text-gray-500"
              />
            </div>
          </div>
        </div>
        {/* Ingredients */}
        <div className="mb-4">
          <label htmlFor="amount" className="mb-2 block text-sm font-medium">
            Ingredients
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="amount"
                name="amount"
                step="0.01"
                placeholder="Enter ingredients here..."
                className="peer block w-full rounded-md border border-gray-200 py-2 text-sm outline-2 placeholder:text-gray-500"
              />
            </div>
          </div>
        </div>

        <fieldset>
          {/* Directions */}
          <div className="mb-4">
            <label
              htmlFor="directions"
              className="mb-2 block text-sm font-medium"
            >
              Directions
            </label>
            <div className="relative mt-2 rounded-md">
              <div className="relative">
                <input
                  id="directions"
                  name="directions"
                  placeholder="Enter directions here..."
                  className="peer block w-full rounded-md border border-gray-200 py-2 text-sm outline-2 placeholder:text-gray-500"
                />
              </div>
            </div>
          </div>
        </fieldset>
        {/* Nutrition */}
        <div className="mb-4">
          <label htmlFor="nutrition" className="mb-2 block text-sm font-medium">
            Nutrition
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="nutrition"
                name="amount"
                step="0.01"
                placeholder="Enter nutrition details here..."
                className="peer block w-full rounded-md border border-gray-200 py-2 text-sm outline-2 placeholder:text-gray-500"
              />
            </div>
          </div>
        </div>
        {/* Ingredients */}
        <div className="mb-4">
          <label htmlFor="amount" className="mb-2 block text-sm font-medium">
            Notes
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="notes"
                name="notes"
                step="0.01"
                placeholder="Enter recipe notes here..."
                className="peer block w-full rounded-md border border-gray-200 py-2 text-sm outline-2 placeholder:text-gray-500"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/invoices"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Create Invoice</Button>
      </div>
    </form>
  );
}
