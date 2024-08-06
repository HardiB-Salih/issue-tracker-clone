import dynamic from "next/dynamic";
import LoadingIssue from "../../../components/loading-issue";

const IssueForm = dynamic(() => import("@/app/issues/_components/issue-form"), {
  ssr: false,
  loading: () => <LoadingIssue />,
});
export default function NewIssue() {
  return <IssueForm />;
}
