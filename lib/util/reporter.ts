const UNKNOWN =
  '予期せぬエラーが発生しました。時間を置いてもう一度お試しください。';

export const createErrorReporter = (
  reason: string,
  error: unknown,
  payload: Record<string, any>,
) => {
  return {
    message: UNKNOWN,
    name: 'UnknownError',
    payload: {
      ...payload,
      error,
    },
    reason: [reason],
  } as const;
};
