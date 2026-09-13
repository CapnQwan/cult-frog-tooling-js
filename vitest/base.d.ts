export interface BaseVitestOptions {
    aliasName?: string;
    aliasEntry?: string;
    cwd?: string;
    testOverrides?: Record<string, unknown>;
  }
  
  export interface BaseVitestConfig {
    test: Record<string, unknown>;
    resolve: {
      alias?: Record<string, string>;
    };
  }
  
  export declare function baseVitestConfig(
    options?: BaseVitestOptions
  ): BaseVitestConfig;