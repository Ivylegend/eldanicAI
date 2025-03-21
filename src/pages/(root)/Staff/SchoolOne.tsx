import RootLayout from "@/layouts/RootLayout";
import { SchoolForm } from "@/components/SchoolForm";
import type { SchoolFormData } from "@/components/SchoolForm";

export default function SchoolOne() {
  const handleSubmit = (data: SchoolFormData) => {
    console.log(data);
    // Handle form submission
  };

  return (
    <RootLayout title="Dashboard">
      <div className=" mx-auto mt-4">
        <h2 className="text-2xl font-semibold mb-4">
          Extra Details for School One
        </h2>
        <SchoolForm onSubmit={handleSubmit} />
      </div>
    </RootLayout>
  );
}
