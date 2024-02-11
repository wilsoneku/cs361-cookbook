import { lusitana } from '../fonts';

export default async function CardWrapper() {
  return (
    <>
      {/* NOTE: comment in this code when you get to this point in the course */}

      <Card title="Chicken" />
      <Card title="Potatoes" />
      <Card title="Vegetables" />
      <Card title="Pie" />
    </>
  );
}

export function Card({
  title,
}: {
  title: string;
  //thumbnail
  //cuisine
  //tags
}) {
  return (
    <div className="flex flex-row rounded-xl bg-gray-50 p-2 shadow-sm">
      <p
        className={`${lusitana.className}
          truncate rounded-xl bg-white px-4 py-8 text-center`}
      >
        thumbnail
      </p>
      <div className="flex p-4">
        <h3 className="py-4text-sm ml-2 font-medium">{title}</h3>
      </div>
    </div>
  );
}
