import { AxiosProgressEvent, AxiosResponse } from "axios";
import { baseAxiosClient } from ".";
import { Word, WordGroup, WordTrainingSession } from "@typings/word";

const subroute = "/words";

const sleep = (time: number) =>
  new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, time);
  });

interface GetAllWordsParams {
  isRandom?: boolean;
  amount?: number;
  group?: string;
}

export interface GetTrainingSessionParams {
  groupId: string;
}

export interface GetTrainingSessionResponse {
  sessions: WordTrainingSession[];
}

class WordsApi {
  static async uploadWords(
    file: File,
    onUploadProgress: (progressEvent: AxiosProgressEvent) => void,
    onDownloadProgress: (progressEvent: AxiosProgressEvent) => void
  ): Promise<AxiosResponse<{ ok: boolean }>> {
    const formData = new FormData();

    formData.set("words_csv", file);

    return baseAxiosClient.post(`${subroute}/`, formData, {
      onUploadProgress,
      onDownloadProgress,
    });
  }

  static async getAll(
    params: GetAllWordsParams
  ): Promise<AxiosResponse<{ words: Word[] }>> {
    if (!params.group && !params.isRandom)
      return baseAxiosClient.get(`${subroute}/`);

    const searchParams = new URLSearchParams();

    if (params.group) searchParams.set("group", params.group);
    if (params.isRandom) searchParams.set("random", String(params.isRandom));
    if (params.amount) searchParams.set("amount", String(params.amount));

    await sleep(500);

    return baseAxiosClient.get(`${subroute}/?${searchParams.toString()}`);
  }

  static async getAllWordGroups(): Promise<
    AxiosResponse<{ groups: WordGroup[] }>
  > {
    await sleep(1000);

    return baseAxiosClient.get(`${subroute}/groups`);
  }

  static async recordSession(
    dto: Pick<
      WordTrainingSession,
      "correctAnswersCount" | "group" | "wordsCount"
    >
  ) {
    return baseAxiosClient.post(`${subroute}/training-session`, dto);
  }

  static async getSessions(
    dto: GetTrainingSessionParams
  ): Promise<AxiosResponse<GetTrainingSessionResponse>> {
    await sleep(500);

    return baseAxiosClient.get(`${subroute}/training-session/${dto.groupId}`);
  }

  static async updateWord(
    word: Required<Pick<Word, "_id">> & Partial<Word>
  ): Promise<AxiosResponse<{ word: Word }>> {
    return baseAxiosClient.put(`${subroute}/${word._id}`, word);
  }
}

export { WordsApi };
