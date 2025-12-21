// plugins/mx-core-rbm/src/utils/domainAliasResolver.ts

/**
 * Memetakan label-field yang berbeda tetapi secara semantik
 * bermakna sama ke satu nama kanonik (alias).
 * Misalnya: "Tag No", "Line No", "Item No" => "tag_number"
 */
export function resolveAlias(label: string): string | undefined {
  const norm = label.trim().toLowerCase();

  // 💡 Aturan semantik untuk "tag_number"
  if (/(tag|line|item)[\s_-]*(no|number)/i.test(norm)) {
    return 'tag_number';
  }

  // Tambahkan aturan lain di sini bila perlu

  return undefined;
}
