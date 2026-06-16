import { redirect } from "next/navigation";

export default function DashboardRootPage({ params }: { params: { locale: string } }) {
  redirect(`/${params.locale}/dashboard/trader`);
}
