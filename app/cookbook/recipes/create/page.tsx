import Breadcrumbs from '@/app/ui/recipes/breadcrumbs';
import RecipeForm from '@/app/ui/create-recipe/main-form';

export default async function Page() {
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          {
            label: 'Create Recipe',
            href: '/cookbook/recipes/create',
            active: true,
          },
        ]}
      />
      <RecipeForm />
    </main>
  );
}
