// plugins/mx-core-rbm/src/app/configuration/[assetTypeId]/page.tsx

import ConfigurationPage from '@/components/configuration/ConfigurationPage';

export default function ConfigurationByAssetType({
  params,
}: {
  params: { assetType: string };
}) {
  return <ConfigurationPage defaultAssetTypeId={params.assetType} />;
}
