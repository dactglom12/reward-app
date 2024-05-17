import { WordGroup } from "@typings/word";

export const sortGroups = (groups: WordGroup[]) =>
  groups.sort((groupA, groupB) => {
    const numbersOnlyRegexp = new RegExp(/\d+/);
    const numA = numbersOnlyRegexp.exec(groupA.title);
    const numB = numbersOnlyRegexp.exec(groupB.title);

    if (!numB || !numA) return 0;

    return Number(numA[0]) - Number(numB[0]);
  });
