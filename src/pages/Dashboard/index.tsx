import React from "react";
import {MainLayout} from "../../components/layout/MainLayout";
import {DiagnosticsTable} from "../../components/insights/DiagnosticsTable";
import {FusionTrendGraph} from "../../components/insights/FusionTrendGraph";
import {FusionTrendControl} from "../../components/insights/FusionTrendControl";

export const Dashboard: React.FC = () => {
  return (
      <MainLayout>
        <FusionTrendControl/>
        <FusionTrendGraph/>
        <DiagnosticsTable/>
      </MainLayout>
  )
}