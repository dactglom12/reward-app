import { Word } from "@models/wordModel";
import { WordGroupService } from "@services/wordGroupService";
import { WordService } from "@services/wordService";
import { WordTrainingSessionService } from "@services/wordTrainingSessionService";
import { Router } from "express";
import multer from "multer";
import { parse } from "csv-parse/sync";
import { getRandomElements } from "@utils/arrayUtils";

const router = Router();
const upload = multer();

const parseFile = (
  file: Express.Multer.File
): { words: Pick<Word, "native" | "group">[]; groups: string[] } => {
  const utf8String = file.buffer.toString("utf-8");
  const records: { busybod: string; group: string }[] = parse(utf8String, {
    columns: true,
    skip_empty_lines: true,
  });
  const groupsHash: Record<string, true> = {};

  const words = records.map((contentRow) => {
    // TODO: eliminate busybod key
    const { busybod: native, group } = contentRow;

    const trimmedGroupTitle = group
      .trim()
      .replace(/\s+/g, " ")
      .replace(/\r/g, "");

    groupsHash[trimmedGroupTitle] = true;

    return { native, group: trimmedGroupTitle };
  });

  return {
    words,
    groups: Object.keys(groupsHash),
  };
};

router.post("/", upload.single("words_csv"), async (req, res) => {
  try {
    if (!req.file) throw new Error("File is required");

    const { words, groups } = parseFile(req.file);

    const wordsGenerationPromises = words.map((word) =>
      WordService.create(word)
    );
    const categoriesGenerationPromises = groups.map((groupTitle) =>
      WordGroupService.create({ title: groupTitle })
    );

    const wordResults = await Promise.allSettled(wordsGenerationPromises);
    const categoriesResults = await Promise.allSettled(
      categoriesGenerationPromises
    );

    return res.json({
      wordResults: wordResults.map((settledResult, index) => {
        const respectiveWord = words[index];

        if (settledResult.status === "rejected") {
          console.log(settledResult.reason);
        }

        return {
          word: respectiveWord,
          failed: settledResult.status === "rejected",
          error:
            settledResult.status === "rejected" ? settledResult.reason : null,
        };
      }),
      categoriesResults: categoriesResults.map((settledResult, index) => {
        const respectiveWordGroup = groups[index];

        if (settledResult.status === "rejected") {
          console.log(settledResult.reason);
        }

        return {
          group: respectiveWordGroup,
          failed: settledResult.status === "rejected",
          error:
            settledResult.status === "rejected" ? settledResult.reason : null,
        };
      }),
    });
  } catch (error) {
    return res.json({ error: (error as { message: string }).message });
  }
});

router.get("/", async (req, res) => {
  try {
    const isByGroup = Object.prototype.hasOwnProperty.call(req.query, "group");
    const isRandom = Object.prototype.hasOwnProperty.call(req.query, "random");

    let words: Word[];

    if (isByGroup) {
      words = await WordService.getAllWordsByGroup(req.query.group as string);
    } else if (isRandom && typeof req.query.amount === "string") {
      const allWords = await WordService.getAllWords();
      words = getRandomElements<Word>(allWords, Number(req.query.amount));
    } else {
      words = await WordService.getAllWords();
    }

    return res.json({ words });
  } catch (error) {}
});

router.get("/groups", async (_req, res) => {
  try {
    const wordGroups = await WordGroupService.getAll();

    return res.json({ groups: wordGroups });
  } catch (error) {
    return res.json({ error: (error as { message: string }).message });
  }
});

router.post("/training-session", async (req, res) => {
  try {
    const newSession = await WordTrainingSessionService.create(req.body);

    return res.status(201).json({ session: newSession });
  } catch (error) {
    return res.json({ error: (error as { message: string }).message });
  }
});

export default router;
