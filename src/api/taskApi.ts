import { TaskTypes } from "@typings/task";
import { AxiosResponse } from "axios";
import { baseAxiosClient } from ".";

const subroute = "/tasks";

interface TaskCompleteDto {
  taskType: TaskTypes;
}

interface TaskCompletionParams {
  taskType: TaskTypes;
}

export class TaskApi {
  static async complete(
    dto: TaskCompleteDto
  ): Promise<AxiosResponse<{ reward: number }>> {
    return baseAxiosClient.post(`${subroute}/complete`, dto);
  }

  static async isTaskCompletedToday({
    taskType,
  }: TaskCompletionParams): Promise<AxiosResponse<{ isCompleted: boolean }>> {
    return baseAxiosClient.get(`${subroute}/completion?taskType=${taskType}`);
  }
}
