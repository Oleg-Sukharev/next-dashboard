"use client";

import dynamic from "next/dynamic";
import IssueFormSkeleton from "./loading";

const EditIssueForm = dynamic(
  () => import("@/app/issues/_components/IssueForm"),
  {
    ssr: false,
    loading: () => <IssueFormSkeleton />,
  }
);

export default EditIssueForm;