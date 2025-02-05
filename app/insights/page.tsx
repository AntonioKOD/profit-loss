import { getInsights } from "../actions";
import InsightsClient from "../components/InsightsClient";

export default async function InsightsPage() {
  const insights = await getInsights();

  return <InsightsClient insights={insights} />;
}