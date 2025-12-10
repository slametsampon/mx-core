// plugins/mx-core-rbm/src/app/configuration/[assetTypeId]/page.tsx

import { ConfigurationView } from '@/components/ConfigurationView';

export default function ConfigurationPage({
  params,
}: {
  params: { assetTypeId: string };
}) {
  return <ConfigurationView assetTypeId={params.assetTypeId} />;
}
