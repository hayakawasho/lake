export declare const createErrorReporter: (reason: string, error: unknown, payload: Record<string, any>) => {
    readonly message: "予期せぬエラーが発生しました。時間を置いてもう一度お試しください。";
    readonly name: "UnknownError";
    readonly payload: {
        readonly error: unknown;
    };
    readonly reason: readonly [string];
};
//# sourceMappingURL=reporter.d.ts.map