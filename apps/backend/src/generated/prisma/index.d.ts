
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model SwapRequest
 * 
 */
export type SwapRequest = $Result.DefaultSelection<Prisma.$SwapRequestPayload>
/**
 * Model AuditLog
 * 
 */
export type AuditLog = $Result.DefaultSelection<Prisma.$AuditLogPayload>
/**
 * Model Settings
 * 
 */
export type Settings = $Result.DefaultSelection<Prisma.$SettingsPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const Role: {
  ADMINISTRADOR: 'ADMINISTRADOR',
  ENCARREGADO: 'ENCARREGADO'
};

export type Role = (typeof Role)[keyof typeof Role]


export const EmployeeFunction: {
  MOTORISTA: 'MOTORISTA',
  COBRADOR: 'COBRADOR'
};

export type EmployeeFunction = (typeof EmployeeFunction)[keyof typeof EmployeeFunction]


export const ReliefGroup: {
  G1: 'G1',
  G2: 'G2',
  FIXO_DOMINGO: 'FIXO_DOMINGO',
  SAB_DOMINGO: 'SAB_DOMINGO',
  FIXO_SABADO: 'FIXO_SABADO'
};

export type ReliefGroup = (typeof ReliefGroup)[keyof typeof ReliefGroup]


export const SwapEventType: {
  TROCA: 'TROCA',
  SUBSTITUICAO: 'SUBSTITUICAO'
};

export type SwapEventType = (typeof SwapEventType)[keyof typeof SwapEventType]


export const SwapStatus: {
  AGENDADO: 'AGENDADO',
  NAO_REALIZADA: 'NAO_REALIZADA',
  REALIZADO: 'REALIZADO'
};

export type SwapStatus = (typeof SwapStatus)[keyof typeof SwapStatus]


export const DayOfWeek: {
  SUNDAY: 'SUNDAY',
  MONDAY: 'MONDAY',
  TUESDAY: 'TUESDAY',
  WEDNESDAY: 'WEDNESDAY',
  THURSDAY: 'THURSDAY',
  FRIDAY: 'FRIDAY',
  SATURDAY: 'SATURDAY'
};

export type DayOfWeek = (typeof DayOfWeek)[keyof typeof DayOfWeek]

}

export type Role = $Enums.Role

export const Role: typeof $Enums.Role

export type EmployeeFunction = $Enums.EmployeeFunction

export const EmployeeFunction: typeof $Enums.EmployeeFunction

export type ReliefGroup = $Enums.ReliefGroup

export const ReliefGroup: typeof $Enums.ReliefGroup

export type SwapEventType = $Enums.SwapEventType

export const SwapEventType: typeof $Enums.SwapEventType

export type SwapStatus = $Enums.SwapStatus

export const SwapStatus: typeof $Enums.SwapStatus

export type DayOfWeek = $Enums.DayOfWeek

export const DayOfWeek: typeof $Enums.DayOfWeek

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.swapRequest`: Exposes CRUD operations for the **SwapRequest** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more SwapRequests
    * const swapRequests = await prisma.swapRequest.findMany()
    * ```
    */
  get swapRequest(): Prisma.SwapRequestDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.auditLog`: Exposes CRUD operations for the **AuditLog** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AuditLogs
    * const auditLogs = await prisma.auditLog.findMany()
    * ```
    */
  get auditLog(): Prisma.AuditLogDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.settings`: Exposes CRUD operations for the **Settings** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Settings
    * const settings = await prisma.settings.findMany()
    * ```
    */
  get settings(): Prisma.SettingsDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.7.0
   * Query Engine version: 3cff47a7f5d65c3ea74883f1d736e41d68ce91ed
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    SwapRequest: 'SwapRequest',
    AuditLog: 'AuditLog',
    Settings: 'Settings'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "swapRequest" | "auditLog" | "settings"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      SwapRequest: {
        payload: Prisma.$SwapRequestPayload<ExtArgs>
        fields: Prisma.SwapRequestFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SwapRequestFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SwapRequestPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SwapRequestFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SwapRequestPayload>
          }
          findFirst: {
            args: Prisma.SwapRequestFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SwapRequestPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SwapRequestFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SwapRequestPayload>
          }
          findMany: {
            args: Prisma.SwapRequestFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SwapRequestPayload>[]
          }
          create: {
            args: Prisma.SwapRequestCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SwapRequestPayload>
          }
          createMany: {
            args: Prisma.SwapRequestCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SwapRequestCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SwapRequestPayload>[]
          }
          delete: {
            args: Prisma.SwapRequestDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SwapRequestPayload>
          }
          update: {
            args: Prisma.SwapRequestUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SwapRequestPayload>
          }
          deleteMany: {
            args: Prisma.SwapRequestDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SwapRequestUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SwapRequestUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SwapRequestPayload>[]
          }
          upsert: {
            args: Prisma.SwapRequestUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SwapRequestPayload>
          }
          aggregate: {
            args: Prisma.SwapRequestAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSwapRequest>
          }
          groupBy: {
            args: Prisma.SwapRequestGroupByArgs<ExtArgs>
            result: $Utils.Optional<SwapRequestGroupByOutputType>[]
          }
          count: {
            args: Prisma.SwapRequestCountArgs<ExtArgs>
            result: $Utils.Optional<SwapRequestCountAggregateOutputType> | number
          }
        }
      }
      AuditLog: {
        payload: Prisma.$AuditLogPayload<ExtArgs>
        fields: Prisma.AuditLogFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AuditLogFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AuditLogFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          findFirst: {
            args: Prisma.AuditLogFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AuditLogFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          findMany: {
            args: Prisma.AuditLogFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>[]
          }
          create: {
            args: Prisma.AuditLogCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          createMany: {
            args: Prisma.AuditLogCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AuditLogCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>[]
          }
          delete: {
            args: Prisma.AuditLogDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          update: {
            args: Prisma.AuditLogUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          deleteMany: {
            args: Prisma.AuditLogDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AuditLogUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AuditLogUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>[]
          }
          upsert: {
            args: Prisma.AuditLogUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          aggregate: {
            args: Prisma.AuditLogAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAuditLog>
          }
          groupBy: {
            args: Prisma.AuditLogGroupByArgs<ExtArgs>
            result: $Utils.Optional<AuditLogGroupByOutputType>[]
          }
          count: {
            args: Prisma.AuditLogCountArgs<ExtArgs>
            result: $Utils.Optional<AuditLogCountAggregateOutputType> | number
          }
        }
      }
      Settings: {
        payload: Prisma.$SettingsPayload<ExtArgs>
        fields: Prisma.SettingsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SettingsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SettingsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SettingsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SettingsPayload>
          }
          findFirst: {
            args: Prisma.SettingsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SettingsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SettingsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SettingsPayload>
          }
          findMany: {
            args: Prisma.SettingsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SettingsPayload>[]
          }
          create: {
            args: Prisma.SettingsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SettingsPayload>
          }
          createMany: {
            args: Prisma.SettingsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SettingsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SettingsPayload>[]
          }
          delete: {
            args: Prisma.SettingsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SettingsPayload>
          }
          update: {
            args: Prisma.SettingsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SettingsPayload>
          }
          deleteMany: {
            args: Prisma.SettingsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SettingsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SettingsUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SettingsPayload>[]
          }
          upsert: {
            args: Prisma.SettingsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SettingsPayload>
          }
          aggregate: {
            args: Prisma.SettingsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSettings>
          }
          groupBy: {
            args: Prisma.SettingsGroupByArgs<ExtArgs>
            result: $Utils.Optional<SettingsGroupByOutputType>[]
          }
          count: {
            args: Prisma.SettingsCountArgs<ExtArgs>
            result: $Utils.Optional<SettingsCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    swapRequest?: SwapRequestOmit
    auditLog?: AuditLogOmit
    settings?: SettingsOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    submittedRequests: number
    auditLogs: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    submittedRequests?: boolean | UserCountOutputTypeCountSubmittedRequestsArgs
    auditLogs?: boolean | UserCountOutputTypeCountAuditLogsArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountSubmittedRequestsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SwapRequestWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountAuditLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AuditLogWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserAvgAggregateOutputType = {
    id: number | null
  }

  export type UserSumAggregateOutputType = {
    id: number | null
  }

  export type UserMinAggregateOutputType = {
    id: number | null
    name: string | null
    loginIdentifier: string | null
    passwordHash: string | null
    role: $Enums.Role | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: number | null
    name: string | null
    loginIdentifier: string | null
    passwordHash: string | null
    role: $Enums.Role | null
    isActive: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    name: number
    loginIdentifier: number
    passwordHash: number
    role: number
    isActive: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserAvgAggregateInputType = {
    id?: true
  }

  export type UserSumAggregateInputType = {
    id?: true
  }

  export type UserMinAggregateInputType = {
    id?: true
    name?: true
    loginIdentifier?: true
    passwordHash?: true
    role?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    name?: true
    loginIdentifier?: true
    passwordHash?: true
    role?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    name?: true
    loginIdentifier?: true
    passwordHash?: true
    role?: true
    isActive?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _avg?: UserAvgAggregateInputType
    _sum?: UserSumAggregateInputType
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: number
    name: string
    loginIdentifier: string
    passwordHash: string
    role: $Enums.Role
    isActive: boolean
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    loginIdentifier?: boolean
    passwordHash?: boolean
    role?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    submittedRequests?: boolean | User$submittedRequestsArgs<ExtArgs>
    auditLogs?: boolean | User$auditLogsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    loginIdentifier?: boolean
    passwordHash?: boolean
    role?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    loginIdentifier?: boolean
    passwordHash?: boolean
    role?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    name?: boolean
    loginIdentifier?: boolean
    passwordHash?: boolean
    role?: boolean
    isActive?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "loginIdentifier" | "passwordHash" | "role" | "isActive" | "createdAt" | "updatedAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    submittedRequests?: boolean | User$submittedRequestsArgs<ExtArgs>
    auditLogs?: boolean | User$auditLogsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      submittedRequests: Prisma.$SwapRequestPayload<ExtArgs>[]
      auditLogs: Prisma.$AuditLogPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string
      loginIdentifier: string
      passwordHash: string
      role: $Enums.Role
      isActive: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    submittedRequests<T extends User$submittedRequestsArgs<ExtArgs> = {}>(args?: Subset<T, User$submittedRequestsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SwapRequestPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    auditLogs<T extends User$auditLogsArgs<ExtArgs> = {}>(args?: Subset<T, User$auditLogsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'Int'>
    readonly name: FieldRef<"User", 'String'>
    readonly loginIdentifier: FieldRef<"User", 'String'>
    readonly passwordHash: FieldRef<"User", 'String'>
    readonly role: FieldRef<"User", 'Role'>
    readonly isActive: FieldRef<"User", 'Boolean'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.submittedRequests
   */
  export type User$submittedRequestsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SwapRequest
     */
    select?: SwapRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SwapRequest
     */
    omit?: SwapRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SwapRequestInclude<ExtArgs> | null
    where?: SwapRequestWhereInput
    orderBy?: SwapRequestOrderByWithRelationInput | SwapRequestOrderByWithRelationInput[]
    cursor?: SwapRequestWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SwapRequestScalarFieldEnum | SwapRequestScalarFieldEnum[]
  }

  /**
   * User.auditLogs
   */
  export type User$auditLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    where?: AuditLogWhereInput
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    cursor?: AuditLogWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AuditLogScalarFieldEnum | AuditLogScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model SwapRequest
   */

  export type AggregateSwapRequest = {
    _count: SwapRequestCountAggregateOutputType | null
    _avg: SwapRequestAvgAggregateOutputType | null
    _sum: SwapRequestSumAggregateOutputType | null
    _min: SwapRequestMinAggregateOutputType | null
    _max: SwapRequestMaxAggregateOutputType | null
  }

  export type SwapRequestAvgAggregateOutputType = {
    id: number | null
    submittedById: number | null
    relatedRequestId: number | null
  }

  export type SwapRequestSumAggregateOutputType = {
    id: number | null
    submittedById: number | null
    relatedRequestId: number | null
  }

  export type SwapRequestMinAggregateOutputType = {
    id: number | null
    employeeIdOut: string | null
    employeeIdIn: string | null
    swapDate: Date | null
    paybackDate: Date | null
    employeeFunction: $Enums.EmployeeFunction | null
    groupOut: $Enums.ReliefGroup | null
    groupIn: $Enums.ReliefGroup | null
    eventType: $Enums.SwapEventType | null
    status: $Enums.SwapStatus | null
    observation: string | null
    submittedById: number | null
    isMirror: boolean | null
    relatedRequestId: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SwapRequestMaxAggregateOutputType = {
    id: number | null
    employeeIdOut: string | null
    employeeIdIn: string | null
    swapDate: Date | null
    paybackDate: Date | null
    employeeFunction: $Enums.EmployeeFunction | null
    groupOut: $Enums.ReliefGroup | null
    groupIn: $Enums.ReliefGroup | null
    eventType: $Enums.SwapEventType | null
    status: $Enums.SwapStatus | null
    observation: string | null
    submittedById: number | null
    isMirror: boolean | null
    relatedRequestId: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SwapRequestCountAggregateOutputType = {
    id: number
    employeeIdOut: number
    employeeIdIn: number
    swapDate: number
    paybackDate: number
    employeeFunction: number
    groupOut: number
    groupIn: number
    eventType: number
    status: number
    observation: number
    submittedById: number
    isMirror: number
    relatedRequestId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type SwapRequestAvgAggregateInputType = {
    id?: true
    submittedById?: true
    relatedRequestId?: true
  }

  export type SwapRequestSumAggregateInputType = {
    id?: true
    submittedById?: true
    relatedRequestId?: true
  }

  export type SwapRequestMinAggregateInputType = {
    id?: true
    employeeIdOut?: true
    employeeIdIn?: true
    swapDate?: true
    paybackDate?: true
    employeeFunction?: true
    groupOut?: true
    groupIn?: true
    eventType?: true
    status?: true
    observation?: true
    submittedById?: true
    isMirror?: true
    relatedRequestId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SwapRequestMaxAggregateInputType = {
    id?: true
    employeeIdOut?: true
    employeeIdIn?: true
    swapDate?: true
    paybackDate?: true
    employeeFunction?: true
    groupOut?: true
    groupIn?: true
    eventType?: true
    status?: true
    observation?: true
    submittedById?: true
    isMirror?: true
    relatedRequestId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SwapRequestCountAggregateInputType = {
    id?: true
    employeeIdOut?: true
    employeeIdIn?: true
    swapDate?: true
    paybackDate?: true
    employeeFunction?: true
    groupOut?: true
    groupIn?: true
    eventType?: true
    status?: true
    observation?: true
    submittedById?: true
    isMirror?: true
    relatedRequestId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type SwapRequestAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SwapRequest to aggregate.
     */
    where?: SwapRequestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SwapRequests to fetch.
     */
    orderBy?: SwapRequestOrderByWithRelationInput | SwapRequestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SwapRequestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SwapRequests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SwapRequests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned SwapRequests
    **/
    _count?: true | SwapRequestCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SwapRequestAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SwapRequestSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SwapRequestMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SwapRequestMaxAggregateInputType
  }

  export type GetSwapRequestAggregateType<T extends SwapRequestAggregateArgs> = {
        [P in keyof T & keyof AggregateSwapRequest]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSwapRequest[P]>
      : GetScalarType<T[P], AggregateSwapRequest[P]>
  }




  export type SwapRequestGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SwapRequestWhereInput
    orderBy?: SwapRequestOrderByWithAggregationInput | SwapRequestOrderByWithAggregationInput[]
    by: SwapRequestScalarFieldEnum[] | SwapRequestScalarFieldEnum
    having?: SwapRequestScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SwapRequestCountAggregateInputType | true
    _avg?: SwapRequestAvgAggregateInputType
    _sum?: SwapRequestSumAggregateInputType
    _min?: SwapRequestMinAggregateInputType
    _max?: SwapRequestMaxAggregateInputType
  }

  export type SwapRequestGroupByOutputType = {
    id: number
    employeeIdOut: string
    employeeIdIn: string
    swapDate: Date
    paybackDate: Date
    employeeFunction: $Enums.EmployeeFunction
    groupOut: $Enums.ReliefGroup
    groupIn: $Enums.ReliefGroup
    eventType: $Enums.SwapEventType
    status: $Enums.SwapStatus
    observation: string | null
    submittedById: number
    isMirror: boolean
    relatedRequestId: number | null
    createdAt: Date
    updatedAt: Date
    _count: SwapRequestCountAggregateOutputType | null
    _avg: SwapRequestAvgAggregateOutputType | null
    _sum: SwapRequestSumAggregateOutputType | null
    _min: SwapRequestMinAggregateOutputType | null
    _max: SwapRequestMaxAggregateOutputType | null
  }

  type GetSwapRequestGroupByPayload<T extends SwapRequestGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SwapRequestGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SwapRequestGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SwapRequestGroupByOutputType[P]>
            : GetScalarType<T[P], SwapRequestGroupByOutputType[P]>
        }
      >
    >


  export type SwapRequestSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    employeeIdOut?: boolean
    employeeIdIn?: boolean
    swapDate?: boolean
    paybackDate?: boolean
    employeeFunction?: boolean
    groupOut?: boolean
    groupIn?: boolean
    eventType?: boolean
    status?: boolean
    observation?: boolean
    submittedById?: boolean
    isMirror?: boolean
    relatedRequestId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    submittedBy?: boolean | UserDefaultArgs<ExtArgs>
    originalRequest?: boolean | SwapRequest$originalRequestArgs<ExtArgs>
    mirrorRequest?: boolean | SwapRequest$mirrorRequestArgs<ExtArgs>
  }, ExtArgs["result"]["swapRequest"]>

  export type SwapRequestSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    employeeIdOut?: boolean
    employeeIdIn?: boolean
    swapDate?: boolean
    paybackDate?: boolean
    employeeFunction?: boolean
    groupOut?: boolean
    groupIn?: boolean
    eventType?: boolean
    status?: boolean
    observation?: boolean
    submittedById?: boolean
    isMirror?: boolean
    relatedRequestId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    submittedBy?: boolean | UserDefaultArgs<ExtArgs>
    originalRequest?: boolean | SwapRequest$originalRequestArgs<ExtArgs>
  }, ExtArgs["result"]["swapRequest"]>

  export type SwapRequestSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    employeeIdOut?: boolean
    employeeIdIn?: boolean
    swapDate?: boolean
    paybackDate?: boolean
    employeeFunction?: boolean
    groupOut?: boolean
    groupIn?: boolean
    eventType?: boolean
    status?: boolean
    observation?: boolean
    submittedById?: boolean
    isMirror?: boolean
    relatedRequestId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    submittedBy?: boolean | UserDefaultArgs<ExtArgs>
    originalRequest?: boolean | SwapRequest$originalRequestArgs<ExtArgs>
  }, ExtArgs["result"]["swapRequest"]>

  export type SwapRequestSelectScalar = {
    id?: boolean
    employeeIdOut?: boolean
    employeeIdIn?: boolean
    swapDate?: boolean
    paybackDate?: boolean
    employeeFunction?: boolean
    groupOut?: boolean
    groupIn?: boolean
    eventType?: boolean
    status?: boolean
    observation?: boolean
    submittedById?: boolean
    isMirror?: boolean
    relatedRequestId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type SwapRequestOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "employeeIdOut" | "employeeIdIn" | "swapDate" | "paybackDate" | "employeeFunction" | "groupOut" | "groupIn" | "eventType" | "status" | "observation" | "submittedById" | "isMirror" | "relatedRequestId" | "createdAt" | "updatedAt", ExtArgs["result"]["swapRequest"]>
  export type SwapRequestInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    submittedBy?: boolean | UserDefaultArgs<ExtArgs>
    originalRequest?: boolean | SwapRequest$originalRequestArgs<ExtArgs>
    mirrorRequest?: boolean | SwapRequest$mirrorRequestArgs<ExtArgs>
  }
  export type SwapRequestIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    submittedBy?: boolean | UserDefaultArgs<ExtArgs>
    originalRequest?: boolean | SwapRequest$originalRequestArgs<ExtArgs>
  }
  export type SwapRequestIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    submittedBy?: boolean | UserDefaultArgs<ExtArgs>
    originalRequest?: boolean | SwapRequest$originalRequestArgs<ExtArgs>
  }

  export type $SwapRequestPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "SwapRequest"
    objects: {
      submittedBy: Prisma.$UserPayload<ExtArgs>
      originalRequest: Prisma.$SwapRequestPayload<ExtArgs> | null
      mirrorRequest: Prisma.$SwapRequestPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      employeeIdOut: string
      employeeIdIn: string
      swapDate: Date
      paybackDate: Date
      employeeFunction: $Enums.EmployeeFunction
      groupOut: $Enums.ReliefGroup
      groupIn: $Enums.ReliefGroup
      eventType: $Enums.SwapEventType
      status: $Enums.SwapStatus
      observation: string | null
      submittedById: number
      isMirror: boolean
      relatedRequestId: number | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["swapRequest"]>
    composites: {}
  }

  type SwapRequestGetPayload<S extends boolean | null | undefined | SwapRequestDefaultArgs> = $Result.GetResult<Prisma.$SwapRequestPayload, S>

  type SwapRequestCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SwapRequestFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SwapRequestCountAggregateInputType | true
    }

  export interface SwapRequestDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['SwapRequest'], meta: { name: 'SwapRequest' } }
    /**
     * Find zero or one SwapRequest that matches the filter.
     * @param {SwapRequestFindUniqueArgs} args - Arguments to find a SwapRequest
     * @example
     * // Get one SwapRequest
     * const swapRequest = await prisma.swapRequest.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SwapRequestFindUniqueArgs>(args: SelectSubset<T, SwapRequestFindUniqueArgs<ExtArgs>>): Prisma__SwapRequestClient<$Result.GetResult<Prisma.$SwapRequestPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one SwapRequest that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SwapRequestFindUniqueOrThrowArgs} args - Arguments to find a SwapRequest
     * @example
     * // Get one SwapRequest
     * const swapRequest = await prisma.swapRequest.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SwapRequestFindUniqueOrThrowArgs>(args: SelectSubset<T, SwapRequestFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SwapRequestClient<$Result.GetResult<Prisma.$SwapRequestPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SwapRequest that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SwapRequestFindFirstArgs} args - Arguments to find a SwapRequest
     * @example
     * // Get one SwapRequest
     * const swapRequest = await prisma.swapRequest.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SwapRequestFindFirstArgs>(args?: SelectSubset<T, SwapRequestFindFirstArgs<ExtArgs>>): Prisma__SwapRequestClient<$Result.GetResult<Prisma.$SwapRequestPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SwapRequest that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SwapRequestFindFirstOrThrowArgs} args - Arguments to find a SwapRequest
     * @example
     * // Get one SwapRequest
     * const swapRequest = await prisma.swapRequest.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SwapRequestFindFirstOrThrowArgs>(args?: SelectSubset<T, SwapRequestFindFirstOrThrowArgs<ExtArgs>>): Prisma__SwapRequestClient<$Result.GetResult<Prisma.$SwapRequestPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more SwapRequests that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SwapRequestFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all SwapRequests
     * const swapRequests = await prisma.swapRequest.findMany()
     * 
     * // Get first 10 SwapRequests
     * const swapRequests = await prisma.swapRequest.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const swapRequestWithIdOnly = await prisma.swapRequest.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SwapRequestFindManyArgs>(args?: SelectSubset<T, SwapRequestFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SwapRequestPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a SwapRequest.
     * @param {SwapRequestCreateArgs} args - Arguments to create a SwapRequest.
     * @example
     * // Create one SwapRequest
     * const SwapRequest = await prisma.swapRequest.create({
     *   data: {
     *     // ... data to create a SwapRequest
     *   }
     * })
     * 
     */
    create<T extends SwapRequestCreateArgs>(args: SelectSubset<T, SwapRequestCreateArgs<ExtArgs>>): Prisma__SwapRequestClient<$Result.GetResult<Prisma.$SwapRequestPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many SwapRequests.
     * @param {SwapRequestCreateManyArgs} args - Arguments to create many SwapRequests.
     * @example
     * // Create many SwapRequests
     * const swapRequest = await prisma.swapRequest.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SwapRequestCreateManyArgs>(args?: SelectSubset<T, SwapRequestCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many SwapRequests and returns the data saved in the database.
     * @param {SwapRequestCreateManyAndReturnArgs} args - Arguments to create many SwapRequests.
     * @example
     * // Create many SwapRequests
     * const swapRequest = await prisma.swapRequest.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many SwapRequests and only return the `id`
     * const swapRequestWithIdOnly = await prisma.swapRequest.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SwapRequestCreateManyAndReturnArgs>(args?: SelectSubset<T, SwapRequestCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SwapRequestPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a SwapRequest.
     * @param {SwapRequestDeleteArgs} args - Arguments to delete one SwapRequest.
     * @example
     * // Delete one SwapRequest
     * const SwapRequest = await prisma.swapRequest.delete({
     *   where: {
     *     // ... filter to delete one SwapRequest
     *   }
     * })
     * 
     */
    delete<T extends SwapRequestDeleteArgs>(args: SelectSubset<T, SwapRequestDeleteArgs<ExtArgs>>): Prisma__SwapRequestClient<$Result.GetResult<Prisma.$SwapRequestPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one SwapRequest.
     * @param {SwapRequestUpdateArgs} args - Arguments to update one SwapRequest.
     * @example
     * // Update one SwapRequest
     * const swapRequest = await prisma.swapRequest.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SwapRequestUpdateArgs>(args: SelectSubset<T, SwapRequestUpdateArgs<ExtArgs>>): Prisma__SwapRequestClient<$Result.GetResult<Prisma.$SwapRequestPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more SwapRequests.
     * @param {SwapRequestDeleteManyArgs} args - Arguments to filter SwapRequests to delete.
     * @example
     * // Delete a few SwapRequests
     * const { count } = await prisma.swapRequest.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SwapRequestDeleteManyArgs>(args?: SelectSubset<T, SwapRequestDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SwapRequests.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SwapRequestUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many SwapRequests
     * const swapRequest = await prisma.swapRequest.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SwapRequestUpdateManyArgs>(args: SelectSubset<T, SwapRequestUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SwapRequests and returns the data updated in the database.
     * @param {SwapRequestUpdateManyAndReturnArgs} args - Arguments to update many SwapRequests.
     * @example
     * // Update many SwapRequests
     * const swapRequest = await prisma.swapRequest.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more SwapRequests and only return the `id`
     * const swapRequestWithIdOnly = await prisma.swapRequest.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends SwapRequestUpdateManyAndReturnArgs>(args: SelectSubset<T, SwapRequestUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SwapRequestPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one SwapRequest.
     * @param {SwapRequestUpsertArgs} args - Arguments to update or create a SwapRequest.
     * @example
     * // Update or create a SwapRequest
     * const swapRequest = await prisma.swapRequest.upsert({
     *   create: {
     *     // ... data to create a SwapRequest
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the SwapRequest we want to update
     *   }
     * })
     */
    upsert<T extends SwapRequestUpsertArgs>(args: SelectSubset<T, SwapRequestUpsertArgs<ExtArgs>>): Prisma__SwapRequestClient<$Result.GetResult<Prisma.$SwapRequestPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of SwapRequests.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SwapRequestCountArgs} args - Arguments to filter SwapRequests to count.
     * @example
     * // Count the number of SwapRequests
     * const count = await prisma.swapRequest.count({
     *   where: {
     *     // ... the filter for the SwapRequests we want to count
     *   }
     * })
    **/
    count<T extends SwapRequestCountArgs>(
      args?: Subset<T, SwapRequestCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SwapRequestCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a SwapRequest.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SwapRequestAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SwapRequestAggregateArgs>(args: Subset<T, SwapRequestAggregateArgs>): Prisma.PrismaPromise<GetSwapRequestAggregateType<T>>

    /**
     * Group by SwapRequest.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SwapRequestGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SwapRequestGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SwapRequestGroupByArgs['orderBy'] }
        : { orderBy?: SwapRequestGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SwapRequestGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSwapRequestGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the SwapRequest model
   */
  readonly fields: SwapRequestFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for SwapRequest.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SwapRequestClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    submittedBy<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    originalRequest<T extends SwapRequest$originalRequestArgs<ExtArgs> = {}>(args?: Subset<T, SwapRequest$originalRequestArgs<ExtArgs>>): Prisma__SwapRequestClient<$Result.GetResult<Prisma.$SwapRequestPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    mirrorRequest<T extends SwapRequest$mirrorRequestArgs<ExtArgs> = {}>(args?: Subset<T, SwapRequest$mirrorRequestArgs<ExtArgs>>): Prisma__SwapRequestClient<$Result.GetResult<Prisma.$SwapRequestPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the SwapRequest model
   */
  interface SwapRequestFieldRefs {
    readonly id: FieldRef<"SwapRequest", 'Int'>
    readonly employeeIdOut: FieldRef<"SwapRequest", 'String'>
    readonly employeeIdIn: FieldRef<"SwapRequest", 'String'>
    readonly swapDate: FieldRef<"SwapRequest", 'DateTime'>
    readonly paybackDate: FieldRef<"SwapRequest", 'DateTime'>
    readonly employeeFunction: FieldRef<"SwapRequest", 'EmployeeFunction'>
    readonly groupOut: FieldRef<"SwapRequest", 'ReliefGroup'>
    readonly groupIn: FieldRef<"SwapRequest", 'ReliefGroup'>
    readonly eventType: FieldRef<"SwapRequest", 'SwapEventType'>
    readonly status: FieldRef<"SwapRequest", 'SwapStatus'>
    readonly observation: FieldRef<"SwapRequest", 'String'>
    readonly submittedById: FieldRef<"SwapRequest", 'Int'>
    readonly isMirror: FieldRef<"SwapRequest", 'Boolean'>
    readonly relatedRequestId: FieldRef<"SwapRequest", 'Int'>
    readonly createdAt: FieldRef<"SwapRequest", 'DateTime'>
    readonly updatedAt: FieldRef<"SwapRequest", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * SwapRequest findUnique
   */
  export type SwapRequestFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SwapRequest
     */
    select?: SwapRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SwapRequest
     */
    omit?: SwapRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SwapRequestInclude<ExtArgs> | null
    /**
     * Filter, which SwapRequest to fetch.
     */
    where: SwapRequestWhereUniqueInput
  }

  /**
   * SwapRequest findUniqueOrThrow
   */
  export type SwapRequestFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SwapRequest
     */
    select?: SwapRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SwapRequest
     */
    omit?: SwapRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SwapRequestInclude<ExtArgs> | null
    /**
     * Filter, which SwapRequest to fetch.
     */
    where: SwapRequestWhereUniqueInput
  }

  /**
   * SwapRequest findFirst
   */
  export type SwapRequestFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SwapRequest
     */
    select?: SwapRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SwapRequest
     */
    omit?: SwapRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SwapRequestInclude<ExtArgs> | null
    /**
     * Filter, which SwapRequest to fetch.
     */
    where?: SwapRequestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SwapRequests to fetch.
     */
    orderBy?: SwapRequestOrderByWithRelationInput | SwapRequestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SwapRequests.
     */
    cursor?: SwapRequestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SwapRequests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SwapRequests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SwapRequests.
     */
    distinct?: SwapRequestScalarFieldEnum | SwapRequestScalarFieldEnum[]
  }

  /**
   * SwapRequest findFirstOrThrow
   */
  export type SwapRequestFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SwapRequest
     */
    select?: SwapRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SwapRequest
     */
    omit?: SwapRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SwapRequestInclude<ExtArgs> | null
    /**
     * Filter, which SwapRequest to fetch.
     */
    where?: SwapRequestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SwapRequests to fetch.
     */
    orderBy?: SwapRequestOrderByWithRelationInput | SwapRequestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SwapRequests.
     */
    cursor?: SwapRequestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SwapRequests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SwapRequests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SwapRequests.
     */
    distinct?: SwapRequestScalarFieldEnum | SwapRequestScalarFieldEnum[]
  }

  /**
   * SwapRequest findMany
   */
  export type SwapRequestFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SwapRequest
     */
    select?: SwapRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SwapRequest
     */
    omit?: SwapRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SwapRequestInclude<ExtArgs> | null
    /**
     * Filter, which SwapRequests to fetch.
     */
    where?: SwapRequestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SwapRequests to fetch.
     */
    orderBy?: SwapRequestOrderByWithRelationInput | SwapRequestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing SwapRequests.
     */
    cursor?: SwapRequestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SwapRequests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SwapRequests.
     */
    skip?: number
    distinct?: SwapRequestScalarFieldEnum | SwapRequestScalarFieldEnum[]
  }

  /**
   * SwapRequest create
   */
  export type SwapRequestCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SwapRequest
     */
    select?: SwapRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SwapRequest
     */
    omit?: SwapRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SwapRequestInclude<ExtArgs> | null
    /**
     * The data needed to create a SwapRequest.
     */
    data: XOR<SwapRequestCreateInput, SwapRequestUncheckedCreateInput>
  }

  /**
   * SwapRequest createMany
   */
  export type SwapRequestCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many SwapRequests.
     */
    data: SwapRequestCreateManyInput | SwapRequestCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * SwapRequest createManyAndReturn
   */
  export type SwapRequestCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SwapRequest
     */
    select?: SwapRequestSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SwapRequest
     */
    omit?: SwapRequestOmit<ExtArgs> | null
    /**
     * The data used to create many SwapRequests.
     */
    data: SwapRequestCreateManyInput | SwapRequestCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SwapRequestIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * SwapRequest update
   */
  export type SwapRequestUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SwapRequest
     */
    select?: SwapRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SwapRequest
     */
    omit?: SwapRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SwapRequestInclude<ExtArgs> | null
    /**
     * The data needed to update a SwapRequest.
     */
    data: XOR<SwapRequestUpdateInput, SwapRequestUncheckedUpdateInput>
    /**
     * Choose, which SwapRequest to update.
     */
    where: SwapRequestWhereUniqueInput
  }

  /**
   * SwapRequest updateMany
   */
  export type SwapRequestUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update SwapRequests.
     */
    data: XOR<SwapRequestUpdateManyMutationInput, SwapRequestUncheckedUpdateManyInput>
    /**
     * Filter which SwapRequests to update
     */
    where?: SwapRequestWhereInput
    /**
     * Limit how many SwapRequests to update.
     */
    limit?: number
  }

  /**
   * SwapRequest updateManyAndReturn
   */
  export type SwapRequestUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SwapRequest
     */
    select?: SwapRequestSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SwapRequest
     */
    omit?: SwapRequestOmit<ExtArgs> | null
    /**
     * The data used to update SwapRequests.
     */
    data: XOR<SwapRequestUpdateManyMutationInput, SwapRequestUncheckedUpdateManyInput>
    /**
     * Filter which SwapRequests to update
     */
    where?: SwapRequestWhereInput
    /**
     * Limit how many SwapRequests to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SwapRequestIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * SwapRequest upsert
   */
  export type SwapRequestUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SwapRequest
     */
    select?: SwapRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SwapRequest
     */
    omit?: SwapRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SwapRequestInclude<ExtArgs> | null
    /**
     * The filter to search for the SwapRequest to update in case it exists.
     */
    where: SwapRequestWhereUniqueInput
    /**
     * In case the SwapRequest found by the `where` argument doesn't exist, create a new SwapRequest with this data.
     */
    create: XOR<SwapRequestCreateInput, SwapRequestUncheckedCreateInput>
    /**
     * In case the SwapRequest was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SwapRequestUpdateInput, SwapRequestUncheckedUpdateInput>
  }

  /**
   * SwapRequest delete
   */
  export type SwapRequestDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SwapRequest
     */
    select?: SwapRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SwapRequest
     */
    omit?: SwapRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SwapRequestInclude<ExtArgs> | null
    /**
     * Filter which SwapRequest to delete.
     */
    where: SwapRequestWhereUniqueInput
  }

  /**
   * SwapRequest deleteMany
   */
  export type SwapRequestDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SwapRequests to delete
     */
    where?: SwapRequestWhereInput
    /**
     * Limit how many SwapRequests to delete.
     */
    limit?: number
  }

  /**
   * SwapRequest.originalRequest
   */
  export type SwapRequest$originalRequestArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SwapRequest
     */
    select?: SwapRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SwapRequest
     */
    omit?: SwapRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SwapRequestInclude<ExtArgs> | null
    where?: SwapRequestWhereInput
  }

  /**
   * SwapRequest.mirrorRequest
   */
  export type SwapRequest$mirrorRequestArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SwapRequest
     */
    select?: SwapRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SwapRequest
     */
    omit?: SwapRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SwapRequestInclude<ExtArgs> | null
    where?: SwapRequestWhereInput
  }

  /**
   * SwapRequest without action
   */
  export type SwapRequestDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SwapRequest
     */
    select?: SwapRequestSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SwapRequest
     */
    omit?: SwapRequestOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SwapRequestInclude<ExtArgs> | null
  }


  /**
   * Model AuditLog
   */

  export type AggregateAuditLog = {
    _count: AuditLogCountAggregateOutputType | null
    _avg: AuditLogAvgAggregateOutputType | null
    _sum: AuditLogSumAggregateOutputType | null
    _min: AuditLogMinAggregateOutputType | null
    _max: AuditLogMaxAggregateOutputType | null
  }

  export type AuditLogAvgAggregateOutputType = {
    id: number | null
    userId: number | null
    targetResourceId: number | null
  }

  export type AuditLogSumAggregateOutputType = {
    id: number | null
    userId: number | null
    targetResourceId: number | null
  }

  export type AuditLogMinAggregateOutputType = {
    id: number | null
    timestamp: Date | null
    action: string | null
    details: string | null
    userId: number | null
    userLoginIdentifier: string | null
    targetResourceId: number | null
    targetResourceType: string | null
  }

  export type AuditLogMaxAggregateOutputType = {
    id: number | null
    timestamp: Date | null
    action: string | null
    details: string | null
    userId: number | null
    userLoginIdentifier: string | null
    targetResourceId: number | null
    targetResourceType: string | null
  }

  export type AuditLogCountAggregateOutputType = {
    id: number
    timestamp: number
    action: number
    details: number
    userId: number
    userLoginIdentifier: number
    targetResourceId: number
    targetResourceType: number
    _all: number
  }


  export type AuditLogAvgAggregateInputType = {
    id?: true
    userId?: true
    targetResourceId?: true
  }

  export type AuditLogSumAggregateInputType = {
    id?: true
    userId?: true
    targetResourceId?: true
  }

  export type AuditLogMinAggregateInputType = {
    id?: true
    timestamp?: true
    action?: true
    details?: true
    userId?: true
    userLoginIdentifier?: true
    targetResourceId?: true
    targetResourceType?: true
  }

  export type AuditLogMaxAggregateInputType = {
    id?: true
    timestamp?: true
    action?: true
    details?: true
    userId?: true
    userLoginIdentifier?: true
    targetResourceId?: true
    targetResourceType?: true
  }

  export type AuditLogCountAggregateInputType = {
    id?: true
    timestamp?: true
    action?: true
    details?: true
    userId?: true
    userLoginIdentifier?: true
    targetResourceId?: true
    targetResourceType?: true
    _all?: true
  }

  export type AuditLogAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AuditLog to aggregate.
     */
    where?: AuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AuditLogs
    **/
    _count?: true | AuditLogCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AuditLogAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AuditLogSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AuditLogMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AuditLogMaxAggregateInputType
  }

  export type GetAuditLogAggregateType<T extends AuditLogAggregateArgs> = {
        [P in keyof T & keyof AggregateAuditLog]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAuditLog[P]>
      : GetScalarType<T[P], AggregateAuditLog[P]>
  }




  export type AuditLogGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AuditLogWhereInput
    orderBy?: AuditLogOrderByWithAggregationInput | AuditLogOrderByWithAggregationInput[]
    by: AuditLogScalarFieldEnum[] | AuditLogScalarFieldEnum
    having?: AuditLogScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AuditLogCountAggregateInputType | true
    _avg?: AuditLogAvgAggregateInputType
    _sum?: AuditLogSumAggregateInputType
    _min?: AuditLogMinAggregateInputType
    _max?: AuditLogMaxAggregateInputType
  }

  export type AuditLogGroupByOutputType = {
    id: number
    timestamp: Date
    action: string
    details: string | null
    userId: number
    userLoginIdentifier: string
    targetResourceId: number | null
    targetResourceType: string | null
    _count: AuditLogCountAggregateOutputType | null
    _avg: AuditLogAvgAggregateOutputType | null
    _sum: AuditLogSumAggregateOutputType | null
    _min: AuditLogMinAggregateOutputType | null
    _max: AuditLogMaxAggregateOutputType | null
  }

  type GetAuditLogGroupByPayload<T extends AuditLogGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AuditLogGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AuditLogGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AuditLogGroupByOutputType[P]>
            : GetScalarType<T[P], AuditLogGroupByOutputType[P]>
        }
      >
    >


  export type AuditLogSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    timestamp?: boolean
    action?: boolean
    details?: boolean
    userId?: boolean
    userLoginIdentifier?: boolean
    targetResourceId?: boolean
    targetResourceType?: boolean
    performedBy?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["auditLog"]>

  export type AuditLogSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    timestamp?: boolean
    action?: boolean
    details?: boolean
    userId?: boolean
    userLoginIdentifier?: boolean
    targetResourceId?: boolean
    targetResourceType?: boolean
    performedBy?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["auditLog"]>

  export type AuditLogSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    timestamp?: boolean
    action?: boolean
    details?: boolean
    userId?: boolean
    userLoginIdentifier?: boolean
    targetResourceId?: boolean
    targetResourceType?: boolean
    performedBy?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["auditLog"]>

  export type AuditLogSelectScalar = {
    id?: boolean
    timestamp?: boolean
    action?: boolean
    details?: boolean
    userId?: boolean
    userLoginIdentifier?: boolean
    targetResourceId?: boolean
    targetResourceType?: boolean
  }

  export type AuditLogOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "timestamp" | "action" | "details" | "userId" | "userLoginIdentifier" | "targetResourceId" | "targetResourceType", ExtArgs["result"]["auditLog"]>
  export type AuditLogInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    performedBy?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type AuditLogIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    performedBy?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type AuditLogIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    performedBy?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $AuditLogPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AuditLog"
    objects: {
      performedBy: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      timestamp: Date
      action: string
      details: string | null
      userId: number
      userLoginIdentifier: string
      targetResourceId: number | null
      targetResourceType: string | null
    }, ExtArgs["result"]["auditLog"]>
    composites: {}
  }

  type AuditLogGetPayload<S extends boolean | null | undefined | AuditLogDefaultArgs> = $Result.GetResult<Prisma.$AuditLogPayload, S>

  type AuditLogCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AuditLogFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AuditLogCountAggregateInputType | true
    }

  export interface AuditLogDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AuditLog'], meta: { name: 'AuditLog' } }
    /**
     * Find zero or one AuditLog that matches the filter.
     * @param {AuditLogFindUniqueArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AuditLogFindUniqueArgs>(args: SelectSubset<T, AuditLogFindUniqueArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one AuditLog that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AuditLogFindUniqueOrThrowArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AuditLogFindUniqueOrThrowArgs>(args: SelectSubset<T, AuditLogFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AuditLog that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogFindFirstArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AuditLogFindFirstArgs>(args?: SelectSubset<T, AuditLogFindFirstArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AuditLog that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogFindFirstOrThrowArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AuditLogFindFirstOrThrowArgs>(args?: SelectSubset<T, AuditLogFindFirstOrThrowArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more AuditLogs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AuditLogs
     * const auditLogs = await prisma.auditLog.findMany()
     * 
     * // Get first 10 AuditLogs
     * const auditLogs = await prisma.auditLog.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const auditLogWithIdOnly = await prisma.auditLog.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AuditLogFindManyArgs>(args?: SelectSubset<T, AuditLogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a AuditLog.
     * @param {AuditLogCreateArgs} args - Arguments to create a AuditLog.
     * @example
     * // Create one AuditLog
     * const AuditLog = await prisma.auditLog.create({
     *   data: {
     *     // ... data to create a AuditLog
     *   }
     * })
     * 
     */
    create<T extends AuditLogCreateArgs>(args: SelectSubset<T, AuditLogCreateArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many AuditLogs.
     * @param {AuditLogCreateManyArgs} args - Arguments to create many AuditLogs.
     * @example
     * // Create many AuditLogs
     * const auditLog = await prisma.auditLog.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AuditLogCreateManyArgs>(args?: SelectSubset<T, AuditLogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AuditLogs and returns the data saved in the database.
     * @param {AuditLogCreateManyAndReturnArgs} args - Arguments to create many AuditLogs.
     * @example
     * // Create many AuditLogs
     * const auditLog = await prisma.auditLog.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AuditLogs and only return the `id`
     * const auditLogWithIdOnly = await prisma.auditLog.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AuditLogCreateManyAndReturnArgs>(args?: SelectSubset<T, AuditLogCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a AuditLog.
     * @param {AuditLogDeleteArgs} args - Arguments to delete one AuditLog.
     * @example
     * // Delete one AuditLog
     * const AuditLog = await prisma.auditLog.delete({
     *   where: {
     *     // ... filter to delete one AuditLog
     *   }
     * })
     * 
     */
    delete<T extends AuditLogDeleteArgs>(args: SelectSubset<T, AuditLogDeleteArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one AuditLog.
     * @param {AuditLogUpdateArgs} args - Arguments to update one AuditLog.
     * @example
     * // Update one AuditLog
     * const auditLog = await prisma.auditLog.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AuditLogUpdateArgs>(args: SelectSubset<T, AuditLogUpdateArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more AuditLogs.
     * @param {AuditLogDeleteManyArgs} args - Arguments to filter AuditLogs to delete.
     * @example
     * // Delete a few AuditLogs
     * const { count } = await prisma.auditLog.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AuditLogDeleteManyArgs>(args?: SelectSubset<T, AuditLogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AuditLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AuditLogs
     * const auditLog = await prisma.auditLog.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AuditLogUpdateManyArgs>(args: SelectSubset<T, AuditLogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AuditLogs and returns the data updated in the database.
     * @param {AuditLogUpdateManyAndReturnArgs} args - Arguments to update many AuditLogs.
     * @example
     * // Update many AuditLogs
     * const auditLog = await prisma.auditLog.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more AuditLogs and only return the `id`
     * const auditLogWithIdOnly = await prisma.auditLog.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AuditLogUpdateManyAndReturnArgs>(args: SelectSubset<T, AuditLogUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one AuditLog.
     * @param {AuditLogUpsertArgs} args - Arguments to update or create a AuditLog.
     * @example
     * // Update or create a AuditLog
     * const auditLog = await prisma.auditLog.upsert({
     *   create: {
     *     // ... data to create a AuditLog
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AuditLog we want to update
     *   }
     * })
     */
    upsert<T extends AuditLogUpsertArgs>(args: SelectSubset<T, AuditLogUpsertArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of AuditLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogCountArgs} args - Arguments to filter AuditLogs to count.
     * @example
     * // Count the number of AuditLogs
     * const count = await prisma.auditLog.count({
     *   where: {
     *     // ... the filter for the AuditLogs we want to count
     *   }
     * })
    **/
    count<T extends AuditLogCountArgs>(
      args?: Subset<T, AuditLogCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AuditLogCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AuditLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AuditLogAggregateArgs>(args: Subset<T, AuditLogAggregateArgs>): Prisma.PrismaPromise<GetAuditLogAggregateType<T>>

    /**
     * Group by AuditLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AuditLogGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AuditLogGroupByArgs['orderBy'] }
        : { orderBy?: AuditLogGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AuditLogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAuditLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AuditLog model
   */
  readonly fields: AuditLogFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AuditLog.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AuditLogClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    performedBy<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the AuditLog model
   */
  interface AuditLogFieldRefs {
    readonly id: FieldRef<"AuditLog", 'Int'>
    readonly timestamp: FieldRef<"AuditLog", 'DateTime'>
    readonly action: FieldRef<"AuditLog", 'String'>
    readonly details: FieldRef<"AuditLog", 'String'>
    readonly userId: FieldRef<"AuditLog", 'Int'>
    readonly userLoginIdentifier: FieldRef<"AuditLog", 'String'>
    readonly targetResourceId: FieldRef<"AuditLog", 'Int'>
    readonly targetResourceType: FieldRef<"AuditLog", 'String'>
  }
    

  // Custom InputTypes
  /**
   * AuditLog findUnique
   */
  export type AuditLogFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * Filter, which AuditLog to fetch.
     */
    where: AuditLogWhereUniqueInput
  }

  /**
   * AuditLog findUniqueOrThrow
   */
  export type AuditLogFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * Filter, which AuditLog to fetch.
     */
    where: AuditLogWhereUniqueInput
  }

  /**
   * AuditLog findFirst
   */
  export type AuditLogFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * Filter, which AuditLog to fetch.
     */
    where?: AuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AuditLogs.
     */
    cursor?: AuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AuditLogs.
     */
    distinct?: AuditLogScalarFieldEnum | AuditLogScalarFieldEnum[]
  }

  /**
   * AuditLog findFirstOrThrow
   */
  export type AuditLogFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * Filter, which AuditLog to fetch.
     */
    where?: AuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AuditLogs.
     */
    cursor?: AuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AuditLogs.
     */
    distinct?: AuditLogScalarFieldEnum | AuditLogScalarFieldEnum[]
  }

  /**
   * AuditLog findMany
   */
  export type AuditLogFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * Filter, which AuditLogs to fetch.
     */
    where?: AuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AuditLogs.
     */
    cursor?: AuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditLogs.
     */
    skip?: number
    distinct?: AuditLogScalarFieldEnum | AuditLogScalarFieldEnum[]
  }

  /**
   * AuditLog create
   */
  export type AuditLogCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * The data needed to create a AuditLog.
     */
    data: XOR<AuditLogCreateInput, AuditLogUncheckedCreateInput>
  }

  /**
   * AuditLog createMany
   */
  export type AuditLogCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AuditLogs.
     */
    data: AuditLogCreateManyInput | AuditLogCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AuditLog createManyAndReturn
   */
  export type AuditLogCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * The data used to create many AuditLogs.
     */
    data: AuditLogCreateManyInput | AuditLogCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * AuditLog update
   */
  export type AuditLogUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * The data needed to update a AuditLog.
     */
    data: XOR<AuditLogUpdateInput, AuditLogUncheckedUpdateInput>
    /**
     * Choose, which AuditLog to update.
     */
    where: AuditLogWhereUniqueInput
  }

  /**
   * AuditLog updateMany
   */
  export type AuditLogUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AuditLogs.
     */
    data: XOR<AuditLogUpdateManyMutationInput, AuditLogUncheckedUpdateManyInput>
    /**
     * Filter which AuditLogs to update
     */
    where?: AuditLogWhereInput
    /**
     * Limit how many AuditLogs to update.
     */
    limit?: number
  }

  /**
   * AuditLog updateManyAndReturn
   */
  export type AuditLogUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * The data used to update AuditLogs.
     */
    data: XOR<AuditLogUpdateManyMutationInput, AuditLogUncheckedUpdateManyInput>
    /**
     * Filter which AuditLogs to update
     */
    where?: AuditLogWhereInput
    /**
     * Limit how many AuditLogs to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * AuditLog upsert
   */
  export type AuditLogUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * The filter to search for the AuditLog to update in case it exists.
     */
    where: AuditLogWhereUniqueInput
    /**
     * In case the AuditLog found by the `where` argument doesn't exist, create a new AuditLog with this data.
     */
    create: XOR<AuditLogCreateInput, AuditLogUncheckedCreateInput>
    /**
     * In case the AuditLog was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AuditLogUpdateInput, AuditLogUncheckedUpdateInput>
  }

  /**
   * AuditLog delete
   */
  export type AuditLogDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
    /**
     * Filter which AuditLog to delete.
     */
    where: AuditLogWhereUniqueInput
  }

  /**
   * AuditLog deleteMany
   */
  export type AuditLogDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AuditLogs to delete
     */
    where?: AuditLogWhereInput
    /**
     * Limit how many AuditLogs to delete.
     */
    limit?: number
  }

  /**
   * AuditLog without action
   */
  export type AuditLogDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AuditLogInclude<ExtArgs> | null
  }


  /**
   * Model Settings
   */

  export type AggregateSettings = {
    _count: SettingsCountAggregateOutputType | null
    _avg: SettingsAvgAggregateOutputType | null
    _sum: SettingsSumAggregateOutputType | null
    _min: SettingsMinAggregateOutputType | null
    _max: SettingsMaxAggregateOutputType | null
  }

  export type SettingsAvgAggregateOutputType = {
    id: number | null
  }

  export type SettingsSumAggregateOutputType = {
    id: number | null
  }

  export type SettingsMinAggregateOutputType = {
    id: number | null
    submissionStartDay: $Enums.DayOfWeek | null
    submissionEndDay: $Enums.DayOfWeek | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SettingsMaxAggregateOutputType = {
    id: number | null
    submissionStartDay: $Enums.DayOfWeek | null
    submissionEndDay: $Enums.DayOfWeek | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SettingsCountAggregateOutputType = {
    id: number
    submissionStartDay: number
    submissionEndDay: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type SettingsAvgAggregateInputType = {
    id?: true
  }

  export type SettingsSumAggregateInputType = {
    id?: true
  }

  export type SettingsMinAggregateInputType = {
    id?: true
    submissionStartDay?: true
    submissionEndDay?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SettingsMaxAggregateInputType = {
    id?: true
    submissionStartDay?: true
    submissionEndDay?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SettingsCountAggregateInputType = {
    id?: true
    submissionStartDay?: true
    submissionEndDay?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type SettingsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Settings to aggregate.
     */
    where?: SettingsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Settings to fetch.
     */
    orderBy?: SettingsOrderByWithRelationInput | SettingsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SettingsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Settings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Settings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Settings
    **/
    _count?: true | SettingsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SettingsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SettingsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SettingsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SettingsMaxAggregateInputType
  }

  export type GetSettingsAggregateType<T extends SettingsAggregateArgs> = {
        [P in keyof T & keyof AggregateSettings]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSettings[P]>
      : GetScalarType<T[P], AggregateSettings[P]>
  }




  export type SettingsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SettingsWhereInput
    orderBy?: SettingsOrderByWithAggregationInput | SettingsOrderByWithAggregationInput[]
    by: SettingsScalarFieldEnum[] | SettingsScalarFieldEnum
    having?: SettingsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SettingsCountAggregateInputType | true
    _avg?: SettingsAvgAggregateInputType
    _sum?: SettingsSumAggregateInputType
    _min?: SettingsMinAggregateInputType
    _max?: SettingsMaxAggregateInputType
  }

  export type SettingsGroupByOutputType = {
    id: number
    submissionStartDay: $Enums.DayOfWeek
    submissionEndDay: $Enums.DayOfWeek
    createdAt: Date
    updatedAt: Date
    _count: SettingsCountAggregateOutputType | null
    _avg: SettingsAvgAggregateOutputType | null
    _sum: SettingsSumAggregateOutputType | null
    _min: SettingsMinAggregateOutputType | null
    _max: SettingsMaxAggregateOutputType | null
  }

  type GetSettingsGroupByPayload<T extends SettingsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SettingsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SettingsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SettingsGroupByOutputType[P]>
            : GetScalarType<T[P], SettingsGroupByOutputType[P]>
        }
      >
    >


  export type SettingsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    submissionStartDay?: boolean
    submissionEndDay?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["settings"]>

  export type SettingsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    submissionStartDay?: boolean
    submissionEndDay?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["settings"]>

  export type SettingsSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    submissionStartDay?: boolean
    submissionEndDay?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["settings"]>

  export type SettingsSelectScalar = {
    id?: boolean
    submissionStartDay?: boolean
    submissionEndDay?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type SettingsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "submissionStartDay" | "submissionEndDay" | "createdAt" | "updatedAt", ExtArgs["result"]["settings"]>

  export type $SettingsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Settings"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      submissionStartDay: $Enums.DayOfWeek
      submissionEndDay: $Enums.DayOfWeek
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["settings"]>
    composites: {}
  }

  type SettingsGetPayload<S extends boolean | null | undefined | SettingsDefaultArgs> = $Result.GetResult<Prisma.$SettingsPayload, S>

  type SettingsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SettingsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SettingsCountAggregateInputType | true
    }

  export interface SettingsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Settings'], meta: { name: 'Settings' } }
    /**
     * Find zero or one Settings that matches the filter.
     * @param {SettingsFindUniqueArgs} args - Arguments to find a Settings
     * @example
     * // Get one Settings
     * const settings = await prisma.settings.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SettingsFindUniqueArgs>(args: SelectSubset<T, SettingsFindUniqueArgs<ExtArgs>>): Prisma__SettingsClient<$Result.GetResult<Prisma.$SettingsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Settings that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SettingsFindUniqueOrThrowArgs} args - Arguments to find a Settings
     * @example
     * // Get one Settings
     * const settings = await prisma.settings.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SettingsFindUniqueOrThrowArgs>(args: SelectSubset<T, SettingsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SettingsClient<$Result.GetResult<Prisma.$SettingsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Settings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SettingsFindFirstArgs} args - Arguments to find a Settings
     * @example
     * // Get one Settings
     * const settings = await prisma.settings.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SettingsFindFirstArgs>(args?: SelectSubset<T, SettingsFindFirstArgs<ExtArgs>>): Prisma__SettingsClient<$Result.GetResult<Prisma.$SettingsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Settings that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SettingsFindFirstOrThrowArgs} args - Arguments to find a Settings
     * @example
     * // Get one Settings
     * const settings = await prisma.settings.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SettingsFindFirstOrThrowArgs>(args?: SelectSubset<T, SettingsFindFirstOrThrowArgs<ExtArgs>>): Prisma__SettingsClient<$Result.GetResult<Prisma.$SettingsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Settings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SettingsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Settings
     * const settings = await prisma.settings.findMany()
     * 
     * // Get first 10 Settings
     * const settings = await prisma.settings.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const settingsWithIdOnly = await prisma.settings.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SettingsFindManyArgs>(args?: SelectSubset<T, SettingsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SettingsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Settings.
     * @param {SettingsCreateArgs} args - Arguments to create a Settings.
     * @example
     * // Create one Settings
     * const Settings = await prisma.settings.create({
     *   data: {
     *     // ... data to create a Settings
     *   }
     * })
     * 
     */
    create<T extends SettingsCreateArgs>(args: SelectSubset<T, SettingsCreateArgs<ExtArgs>>): Prisma__SettingsClient<$Result.GetResult<Prisma.$SettingsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Settings.
     * @param {SettingsCreateManyArgs} args - Arguments to create many Settings.
     * @example
     * // Create many Settings
     * const settings = await prisma.settings.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SettingsCreateManyArgs>(args?: SelectSubset<T, SettingsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Settings and returns the data saved in the database.
     * @param {SettingsCreateManyAndReturnArgs} args - Arguments to create many Settings.
     * @example
     * // Create many Settings
     * const settings = await prisma.settings.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Settings and only return the `id`
     * const settingsWithIdOnly = await prisma.settings.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SettingsCreateManyAndReturnArgs>(args?: SelectSubset<T, SettingsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SettingsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Settings.
     * @param {SettingsDeleteArgs} args - Arguments to delete one Settings.
     * @example
     * // Delete one Settings
     * const Settings = await prisma.settings.delete({
     *   where: {
     *     // ... filter to delete one Settings
     *   }
     * })
     * 
     */
    delete<T extends SettingsDeleteArgs>(args: SelectSubset<T, SettingsDeleteArgs<ExtArgs>>): Prisma__SettingsClient<$Result.GetResult<Prisma.$SettingsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Settings.
     * @param {SettingsUpdateArgs} args - Arguments to update one Settings.
     * @example
     * // Update one Settings
     * const settings = await prisma.settings.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SettingsUpdateArgs>(args: SelectSubset<T, SettingsUpdateArgs<ExtArgs>>): Prisma__SettingsClient<$Result.GetResult<Prisma.$SettingsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Settings.
     * @param {SettingsDeleteManyArgs} args - Arguments to filter Settings to delete.
     * @example
     * // Delete a few Settings
     * const { count } = await prisma.settings.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SettingsDeleteManyArgs>(args?: SelectSubset<T, SettingsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Settings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SettingsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Settings
     * const settings = await prisma.settings.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SettingsUpdateManyArgs>(args: SelectSubset<T, SettingsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Settings and returns the data updated in the database.
     * @param {SettingsUpdateManyAndReturnArgs} args - Arguments to update many Settings.
     * @example
     * // Update many Settings
     * const settings = await prisma.settings.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Settings and only return the `id`
     * const settingsWithIdOnly = await prisma.settings.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends SettingsUpdateManyAndReturnArgs>(args: SelectSubset<T, SettingsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SettingsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Settings.
     * @param {SettingsUpsertArgs} args - Arguments to update or create a Settings.
     * @example
     * // Update or create a Settings
     * const settings = await prisma.settings.upsert({
     *   create: {
     *     // ... data to create a Settings
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Settings we want to update
     *   }
     * })
     */
    upsert<T extends SettingsUpsertArgs>(args: SelectSubset<T, SettingsUpsertArgs<ExtArgs>>): Prisma__SettingsClient<$Result.GetResult<Prisma.$SettingsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Settings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SettingsCountArgs} args - Arguments to filter Settings to count.
     * @example
     * // Count the number of Settings
     * const count = await prisma.settings.count({
     *   where: {
     *     // ... the filter for the Settings we want to count
     *   }
     * })
    **/
    count<T extends SettingsCountArgs>(
      args?: Subset<T, SettingsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SettingsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Settings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SettingsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SettingsAggregateArgs>(args: Subset<T, SettingsAggregateArgs>): Prisma.PrismaPromise<GetSettingsAggregateType<T>>

    /**
     * Group by Settings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SettingsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SettingsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SettingsGroupByArgs['orderBy'] }
        : { orderBy?: SettingsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SettingsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSettingsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Settings model
   */
  readonly fields: SettingsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Settings.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SettingsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Settings model
   */
  interface SettingsFieldRefs {
    readonly id: FieldRef<"Settings", 'Int'>
    readonly submissionStartDay: FieldRef<"Settings", 'DayOfWeek'>
    readonly submissionEndDay: FieldRef<"Settings", 'DayOfWeek'>
    readonly createdAt: FieldRef<"Settings", 'DateTime'>
    readonly updatedAt: FieldRef<"Settings", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Settings findUnique
   */
  export type SettingsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Settings
     */
    select?: SettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Settings
     */
    omit?: SettingsOmit<ExtArgs> | null
    /**
     * Filter, which Settings to fetch.
     */
    where: SettingsWhereUniqueInput
  }

  /**
   * Settings findUniqueOrThrow
   */
  export type SettingsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Settings
     */
    select?: SettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Settings
     */
    omit?: SettingsOmit<ExtArgs> | null
    /**
     * Filter, which Settings to fetch.
     */
    where: SettingsWhereUniqueInput
  }

  /**
   * Settings findFirst
   */
  export type SettingsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Settings
     */
    select?: SettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Settings
     */
    omit?: SettingsOmit<ExtArgs> | null
    /**
     * Filter, which Settings to fetch.
     */
    where?: SettingsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Settings to fetch.
     */
    orderBy?: SettingsOrderByWithRelationInput | SettingsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Settings.
     */
    cursor?: SettingsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Settings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Settings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Settings.
     */
    distinct?: SettingsScalarFieldEnum | SettingsScalarFieldEnum[]
  }

  /**
   * Settings findFirstOrThrow
   */
  export type SettingsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Settings
     */
    select?: SettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Settings
     */
    omit?: SettingsOmit<ExtArgs> | null
    /**
     * Filter, which Settings to fetch.
     */
    where?: SettingsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Settings to fetch.
     */
    orderBy?: SettingsOrderByWithRelationInput | SettingsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Settings.
     */
    cursor?: SettingsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Settings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Settings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Settings.
     */
    distinct?: SettingsScalarFieldEnum | SettingsScalarFieldEnum[]
  }

  /**
   * Settings findMany
   */
  export type SettingsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Settings
     */
    select?: SettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Settings
     */
    omit?: SettingsOmit<ExtArgs> | null
    /**
     * Filter, which Settings to fetch.
     */
    where?: SettingsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Settings to fetch.
     */
    orderBy?: SettingsOrderByWithRelationInput | SettingsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Settings.
     */
    cursor?: SettingsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Settings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Settings.
     */
    skip?: number
    distinct?: SettingsScalarFieldEnum | SettingsScalarFieldEnum[]
  }

  /**
   * Settings create
   */
  export type SettingsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Settings
     */
    select?: SettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Settings
     */
    omit?: SettingsOmit<ExtArgs> | null
    /**
     * The data needed to create a Settings.
     */
    data: XOR<SettingsCreateInput, SettingsUncheckedCreateInput>
  }

  /**
   * Settings createMany
   */
  export type SettingsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Settings.
     */
    data: SettingsCreateManyInput | SettingsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Settings createManyAndReturn
   */
  export type SettingsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Settings
     */
    select?: SettingsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Settings
     */
    omit?: SettingsOmit<ExtArgs> | null
    /**
     * The data used to create many Settings.
     */
    data: SettingsCreateManyInput | SettingsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Settings update
   */
  export type SettingsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Settings
     */
    select?: SettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Settings
     */
    omit?: SettingsOmit<ExtArgs> | null
    /**
     * The data needed to update a Settings.
     */
    data: XOR<SettingsUpdateInput, SettingsUncheckedUpdateInput>
    /**
     * Choose, which Settings to update.
     */
    where: SettingsWhereUniqueInput
  }

  /**
   * Settings updateMany
   */
  export type SettingsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Settings.
     */
    data: XOR<SettingsUpdateManyMutationInput, SettingsUncheckedUpdateManyInput>
    /**
     * Filter which Settings to update
     */
    where?: SettingsWhereInput
    /**
     * Limit how many Settings to update.
     */
    limit?: number
  }

  /**
   * Settings updateManyAndReturn
   */
  export type SettingsUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Settings
     */
    select?: SettingsSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Settings
     */
    omit?: SettingsOmit<ExtArgs> | null
    /**
     * The data used to update Settings.
     */
    data: XOR<SettingsUpdateManyMutationInput, SettingsUncheckedUpdateManyInput>
    /**
     * Filter which Settings to update
     */
    where?: SettingsWhereInput
    /**
     * Limit how many Settings to update.
     */
    limit?: number
  }

  /**
   * Settings upsert
   */
  export type SettingsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Settings
     */
    select?: SettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Settings
     */
    omit?: SettingsOmit<ExtArgs> | null
    /**
     * The filter to search for the Settings to update in case it exists.
     */
    where: SettingsWhereUniqueInput
    /**
     * In case the Settings found by the `where` argument doesn't exist, create a new Settings with this data.
     */
    create: XOR<SettingsCreateInput, SettingsUncheckedCreateInput>
    /**
     * In case the Settings was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SettingsUpdateInput, SettingsUncheckedUpdateInput>
  }

  /**
   * Settings delete
   */
  export type SettingsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Settings
     */
    select?: SettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Settings
     */
    omit?: SettingsOmit<ExtArgs> | null
    /**
     * Filter which Settings to delete.
     */
    where: SettingsWhereUniqueInput
  }

  /**
   * Settings deleteMany
   */
  export type SettingsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Settings to delete
     */
    where?: SettingsWhereInput
    /**
     * Limit how many Settings to delete.
     */
    limit?: number
  }

  /**
   * Settings without action
   */
  export type SettingsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Settings
     */
    select?: SettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Settings
     */
    omit?: SettingsOmit<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    name: 'name',
    loginIdentifier: 'loginIdentifier',
    passwordHash: 'passwordHash',
    role: 'role',
    isActive: 'isActive',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const SwapRequestScalarFieldEnum: {
    id: 'id',
    employeeIdOut: 'employeeIdOut',
    employeeIdIn: 'employeeIdIn',
    swapDate: 'swapDate',
    paybackDate: 'paybackDate',
    employeeFunction: 'employeeFunction',
    groupOut: 'groupOut',
    groupIn: 'groupIn',
    eventType: 'eventType',
    status: 'status',
    observation: 'observation',
    submittedById: 'submittedById',
    isMirror: 'isMirror',
    relatedRequestId: 'relatedRequestId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type SwapRequestScalarFieldEnum = (typeof SwapRequestScalarFieldEnum)[keyof typeof SwapRequestScalarFieldEnum]


  export const AuditLogScalarFieldEnum: {
    id: 'id',
    timestamp: 'timestamp',
    action: 'action',
    details: 'details',
    userId: 'userId',
    userLoginIdentifier: 'userLoginIdentifier',
    targetResourceId: 'targetResourceId',
    targetResourceType: 'targetResourceType'
  };

  export type AuditLogScalarFieldEnum = (typeof AuditLogScalarFieldEnum)[keyof typeof AuditLogScalarFieldEnum]


  export const SettingsScalarFieldEnum: {
    id: 'id',
    submissionStartDay: 'submissionStartDay',
    submissionEndDay: 'submissionEndDay',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type SettingsScalarFieldEnum = (typeof SettingsScalarFieldEnum)[keyof typeof SettingsScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Role'
   */
  export type EnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role'>
    


  /**
   * Reference to a field of type 'Role[]'
   */
  export type ListEnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'EmployeeFunction'
   */
  export type EnumEmployeeFunctionFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'EmployeeFunction'>
    


  /**
   * Reference to a field of type 'EmployeeFunction[]'
   */
  export type ListEnumEmployeeFunctionFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'EmployeeFunction[]'>
    


  /**
   * Reference to a field of type 'ReliefGroup'
   */
  export type EnumReliefGroupFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ReliefGroup'>
    


  /**
   * Reference to a field of type 'ReliefGroup[]'
   */
  export type ListEnumReliefGroupFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ReliefGroup[]'>
    


  /**
   * Reference to a field of type 'SwapEventType'
   */
  export type EnumSwapEventTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'SwapEventType'>
    


  /**
   * Reference to a field of type 'SwapEventType[]'
   */
  export type ListEnumSwapEventTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'SwapEventType[]'>
    


  /**
   * Reference to a field of type 'SwapStatus'
   */
  export type EnumSwapStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'SwapStatus'>
    


  /**
   * Reference to a field of type 'SwapStatus[]'
   */
  export type ListEnumSwapStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'SwapStatus[]'>
    


  /**
   * Reference to a field of type 'DayOfWeek'
   */
  export type EnumDayOfWeekFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DayOfWeek'>
    


  /**
   * Reference to a field of type 'DayOfWeek[]'
   */
  export type ListEnumDayOfWeekFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DayOfWeek[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: IntFilter<"User"> | number
    name?: StringFilter<"User"> | string
    loginIdentifier?: StringFilter<"User"> | string
    passwordHash?: StringFilter<"User"> | string
    role?: EnumRoleFilter<"User"> | $Enums.Role
    isActive?: BoolFilter<"User"> | boolean
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    submittedRequests?: SwapRequestListRelationFilter
    auditLogs?: AuditLogListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    loginIdentifier?: SortOrder
    passwordHash?: SortOrder
    role?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    submittedRequests?: SwapRequestOrderByRelationAggregateInput
    auditLogs?: AuditLogOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    loginIdentifier?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    name?: StringFilter<"User"> | string
    passwordHash?: StringFilter<"User"> | string
    role?: EnumRoleFilter<"User"> | $Enums.Role
    isActive?: BoolFilter<"User"> | boolean
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    submittedRequests?: SwapRequestListRelationFilter
    auditLogs?: AuditLogListRelationFilter
  }, "id" | "loginIdentifier">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    loginIdentifier?: SortOrder
    passwordHash?: SortOrder
    role?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _avg?: UserAvgOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
    _sum?: UserSumOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"User"> | number
    name?: StringWithAggregatesFilter<"User"> | string
    loginIdentifier?: StringWithAggregatesFilter<"User"> | string
    passwordHash?: StringWithAggregatesFilter<"User"> | string
    role?: EnumRoleWithAggregatesFilter<"User"> | $Enums.Role
    isActive?: BoolWithAggregatesFilter<"User"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type SwapRequestWhereInput = {
    AND?: SwapRequestWhereInput | SwapRequestWhereInput[]
    OR?: SwapRequestWhereInput[]
    NOT?: SwapRequestWhereInput | SwapRequestWhereInput[]
    id?: IntFilter<"SwapRequest"> | number
    employeeIdOut?: StringFilter<"SwapRequest"> | string
    employeeIdIn?: StringFilter<"SwapRequest"> | string
    swapDate?: DateTimeFilter<"SwapRequest"> | Date | string
    paybackDate?: DateTimeFilter<"SwapRequest"> | Date | string
    employeeFunction?: EnumEmployeeFunctionFilter<"SwapRequest"> | $Enums.EmployeeFunction
    groupOut?: EnumReliefGroupFilter<"SwapRequest"> | $Enums.ReliefGroup
    groupIn?: EnumReliefGroupFilter<"SwapRequest"> | $Enums.ReliefGroup
    eventType?: EnumSwapEventTypeFilter<"SwapRequest"> | $Enums.SwapEventType
    status?: EnumSwapStatusFilter<"SwapRequest"> | $Enums.SwapStatus
    observation?: StringNullableFilter<"SwapRequest"> | string | null
    submittedById?: IntFilter<"SwapRequest"> | number
    isMirror?: BoolFilter<"SwapRequest"> | boolean
    relatedRequestId?: IntNullableFilter<"SwapRequest"> | number | null
    createdAt?: DateTimeFilter<"SwapRequest"> | Date | string
    updatedAt?: DateTimeFilter<"SwapRequest"> | Date | string
    submittedBy?: XOR<UserScalarRelationFilter, UserWhereInput>
    originalRequest?: XOR<SwapRequestNullableScalarRelationFilter, SwapRequestWhereInput> | null
    mirrorRequest?: XOR<SwapRequestNullableScalarRelationFilter, SwapRequestWhereInput> | null
  }

  export type SwapRequestOrderByWithRelationInput = {
    id?: SortOrder
    employeeIdOut?: SortOrder
    employeeIdIn?: SortOrder
    swapDate?: SortOrder
    paybackDate?: SortOrder
    employeeFunction?: SortOrder
    groupOut?: SortOrder
    groupIn?: SortOrder
    eventType?: SortOrder
    status?: SortOrder
    observation?: SortOrderInput | SortOrder
    submittedById?: SortOrder
    isMirror?: SortOrder
    relatedRequestId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    submittedBy?: UserOrderByWithRelationInput
    originalRequest?: SwapRequestOrderByWithRelationInput
    mirrorRequest?: SwapRequestOrderByWithRelationInput
  }

  export type SwapRequestWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    relatedRequestId?: number
    AND?: SwapRequestWhereInput | SwapRequestWhereInput[]
    OR?: SwapRequestWhereInput[]
    NOT?: SwapRequestWhereInput | SwapRequestWhereInput[]
    employeeIdOut?: StringFilter<"SwapRequest"> | string
    employeeIdIn?: StringFilter<"SwapRequest"> | string
    swapDate?: DateTimeFilter<"SwapRequest"> | Date | string
    paybackDate?: DateTimeFilter<"SwapRequest"> | Date | string
    employeeFunction?: EnumEmployeeFunctionFilter<"SwapRequest"> | $Enums.EmployeeFunction
    groupOut?: EnumReliefGroupFilter<"SwapRequest"> | $Enums.ReliefGroup
    groupIn?: EnumReliefGroupFilter<"SwapRequest"> | $Enums.ReliefGroup
    eventType?: EnumSwapEventTypeFilter<"SwapRequest"> | $Enums.SwapEventType
    status?: EnumSwapStatusFilter<"SwapRequest"> | $Enums.SwapStatus
    observation?: StringNullableFilter<"SwapRequest"> | string | null
    submittedById?: IntFilter<"SwapRequest"> | number
    isMirror?: BoolFilter<"SwapRequest"> | boolean
    createdAt?: DateTimeFilter<"SwapRequest"> | Date | string
    updatedAt?: DateTimeFilter<"SwapRequest"> | Date | string
    submittedBy?: XOR<UserScalarRelationFilter, UserWhereInput>
    originalRequest?: XOR<SwapRequestNullableScalarRelationFilter, SwapRequestWhereInput> | null
    mirrorRequest?: XOR<SwapRequestNullableScalarRelationFilter, SwapRequestWhereInput> | null
  }, "id" | "relatedRequestId">

  export type SwapRequestOrderByWithAggregationInput = {
    id?: SortOrder
    employeeIdOut?: SortOrder
    employeeIdIn?: SortOrder
    swapDate?: SortOrder
    paybackDate?: SortOrder
    employeeFunction?: SortOrder
    groupOut?: SortOrder
    groupIn?: SortOrder
    eventType?: SortOrder
    status?: SortOrder
    observation?: SortOrderInput | SortOrder
    submittedById?: SortOrder
    isMirror?: SortOrder
    relatedRequestId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: SwapRequestCountOrderByAggregateInput
    _avg?: SwapRequestAvgOrderByAggregateInput
    _max?: SwapRequestMaxOrderByAggregateInput
    _min?: SwapRequestMinOrderByAggregateInput
    _sum?: SwapRequestSumOrderByAggregateInput
  }

  export type SwapRequestScalarWhereWithAggregatesInput = {
    AND?: SwapRequestScalarWhereWithAggregatesInput | SwapRequestScalarWhereWithAggregatesInput[]
    OR?: SwapRequestScalarWhereWithAggregatesInput[]
    NOT?: SwapRequestScalarWhereWithAggregatesInput | SwapRequestScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"SwapRequest"> | number
    employeeIdOut?: StringWithAggregatesFilter<"SwapRequest"> | string
    employeeIdIn?: StringWithAggregatesFilter<"SwapRequest"> | string
    swapDate?: DateTimeWithAggregatesFilter<"SwapRequest"> | Date | string
    paybackDate?: DateTimeWithAggregatesFilter<"SwapRequest"> | Date | string
    employeeFunction?: EnumEmployeeFunctionWithAggregatesFilter<"SwapRequest"> | $Enums.EmployeeFunction
    groupOut?: EnumReliefGroupWithAggregatesFilter<"SwapRequest"> | $Enums.ReliefGroup
    groupIn?: EnumReliefGroupWithAggregatesFilter<"SwapRequest"> | $Enums.ReliefGroup
    eventType?: EnumSwapEventTypeWithAggregatesFilter<"SwapRequest"> | $Enums.SwapEventType
    status?: EnumSwapStatusWithAggregatesFilter<"SwapRequest"> | $Enums.SwapStatus
    observation?: StringNullableWithAggregatesFilter<"SwapRequest"> | string | null
    submittedById?: IntWithAggregatesFilter<"SwapRequest"> | number
    isMirror?: BoolWithAggregatesFilter<"SwapRequest"> | boolean
    relatedRequestId?: IntNullableWithAggregatesFilter<"SwapRequest"> | number | null
    createdAt?: DateTimeWithAggregatesFilter<"SwapRequest"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"SwapRequest"> | Date | string
  }

  export type AuditLogWhereInput = {
    AND?: AuditLogWhereInput | AuditLogWhereInput[]
    OR?: AuditLogWhereInput[]
    NOT?: AuditLogWhereInput | AuditLogWhereInput[]
    id?: IntFilter<"AuditLog"> | number
    timestamp?: DateTimeFilter<"AuditLog"> | Date | string
    action?: StringFilter<"AuditLog"> | string
    details?: StringNullableFilter<"AuditLog"> | string | null
    userId?: IntFilter<"AuditLog"> | number
    userLoginIdentifier?: StringFilter<"AuditLog"> | string
    targetResourceId?: IntNullableFilter<"AuditLog"> | number | null
    targetResourceType?: StringNullableFilter<"AuditLog"> | string | null
    performedBy?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type AuditLogOrderByWithRelationInput = {
    id?: SortOrder
    timestamp?: SortOrder
    action?: SortOrder
    details?: SortOrderInput | SortOrder
    userId?: SortOrder
    userLoginIdentifier?: SortOrder
    targetResourceId?: SortOrderInput | SortOrder
    targetResourceType?: SortOrderInput | SortOrder
    performedBy?: UserOrderByWithRelationInput
  }

  export type AuditLogWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: AuditLogWhereInput | AuditLogWhereInput[]
    OR?: AuditLogWhereInput[]
    NOT?: AuditLogWhereInput | AuditLogWhereInput[]
    timestamp?: DateTimeFilter<"AuditLog"> | Date | string
    action?: StringFilter<"AuditLog"> | string
    details?: StringNullableFilter<"AuditLog"> | string | null
    userId?: IntFilter<"AuditLog"> | number
    userLoginIdentifier?: StringFilter<"AuditLog"> | string
    targetResourceId?: IntNullableFilter<"AuditLog"> | number | null
    targetResourceType?: StringNullableFilter<"AuditLog"> | string | null
    performedBy?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type AuditLogOrderByWithAggregationInput = {
    id?: SortOrder
    timestamp?: SortOrder
    action?: SortOrder
    details?: SortOrderInput | SortOrder
    userId?: SortOrder
    userLoginIdentifier?: SortOrder
    targetResourceId?: SortOrderInput | SortOrder
    targetResourceType?: SortOrderInput | SortOrder
    _count?: AuditLogCountOrderByAggregateInput
    _avg?: AuditLogAvgOrderByAggregateInput
    _max?: AuditLogMaxOrderByAggregateInput
    _min?: AuditLogMinOrderByAggregateInput
    _sum?: AuditLogSumOrderByAggregateInput
  }

  export type AuditLogScalarWhereWithAggregatesInput = {
    AND?: AuditLogScalarWhereWithAggregatesInput | AuditLogScalarWhereWithAggregatesInput[]
    OR?: AuditLogScalarWhereWithAggregatesInput[]
    NOT?: AuditLogScalarWhereWithAggregatesInput | AuditLogScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"AuditLog"> | number
    timestamp?: DateTimeWithAggregatesFilter<"AuditLog"> | Date | string
    action?: StringWithAggregatesFilter<"AuditLog"> | string
    details?: StringNullableWithAggregatesFilter<"AuditLog"> | string | null
    userId?: IntWithAggregatesFilter<"AuditLog"> | number
    userLoginIdentifier?: StringWithAggregatesFilter<"AuditLog"> | string
    targetResourceId?: IntNullableWithAggregatesFilter<"AuditLog"> | number | null
    targetResourceType?: StringNullableWithAggregatesFilter<"AuditLog"> | string | null
  }

  export type SettingsWhereInput = {
    AND?: SettingsWhereInput | SettingsWhereInput[]
    OR?: SettingsWhereInput[]
    NOT?: SettingsWhereInput | SettingsWhereInput[]
    id?: IntFilter<"Settings"> | number
    submissionStartDay?: EnumDayOfWeekFilter<"Settings"> | $Enums.DayOfWeek
    submissionEndDay?: EnumDayOfWeekFilter<"Settings"> | $Enums.DayOfWeek
    createdAt?: DateTimeFilter<"Settings"> | Date | string
    updatedAt?: DateTimeFilter<"Settings"> | Date | string
  }

  export type SettingsOrderByWithRelationInput = {
    id?: SortOrder
    submissionStartDay?: SortOrder
    submissionEndDay?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SettingsWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: SettingsWhereInput | SettingsWhereInput[]
    OR?: SettingsWhereInput[]
    NOT?: SettingsWhereInput | SettingsWhereInput[]
    submissionStartDay?: EnumDayOfWeekFilter<"Settings"> | $Enums.DayOfWeek
    submissionEndDay?: EnumDayOfWeekFilter<"Settings"> | $Enums.DayOfWeek
    createdAt?: DateTimeFilter<"Settings"> | Date | string
    updatedAt?: DateTimeFilter<"Settings"> | Date | string
  }, "id">

  export type SettingsOrderByWithAggregationInput = {
    id?: SortOrder
    submissionStartDay?: SortOrder
    submissionEndDay?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: SettingsCountOrderByAggregateInput
    _avg?: SettingsAvgOrderByAggregateInput
    _max?: SettingsMaxOrderByAggregateInput
    _min?: SettingsMinOrderByAggregateInput
    _sum?: SettingsSumOrderByAggregateInput
  }

  export type SettingsScalarWhereWithAggregatesInput = {
    AND?: SettingsScalarWhereWithAggregatesInput | SettingsScalarWhereWithAggregatesInput[]
    OR?: SettingsScalarWhereWithAggregatesInput[]
    NOT?: SettingsScalarWhereWithAggregatesInput | SettingsScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Settings"> | number
    submissionStartDay?: EnumDayOfWeekWithAggregatesFilter<"Settings"> | $Enums.DayOfWeek
    submissionEndDay?: EnumDayOfWeekWithAggregatesFilter<"Settings"> | $Enums.DayOfWeek
    createdAt?: DateTimeWithAggregatesFilter<"Settings"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Settings"> | Date | string
  }

  export type UserCreateInput = {
    name: string
    loginIdentifier: string
    passwordHash: string
    role: $Enums.Role
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    submittedRequests?: SwapRequestCreateNestedManyWithoutSubmittedByInput
    auditLogs?: AuditLogCreateNestedManyWithoutPerformedByInput
  }

  export type UserUncheckedCreateInput = {
    id?: number
    name: string
    loginIdentifier: string
    passwordHash: string
    role: $Enums.Role
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    submittedRequests?: SwapRequestUncheckedCreateNestedManyWithoutSubmittedByInput
    auditLogs?: AuditLogUncheckedCreateNestedManyWithoutPerformedByInput
  }

  export type UserUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    loginIdentifier?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    submittedRequests?: SwapRequestUpdateManyWithoutSubmittedByNestedInput
    auditLogs?: AuditLogUpdateManyWithoutPerformedByNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    loginIdentifier?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    submittedRequests?: SwapRequestUncheckedUpdateManyWithoutSubmittedByNestedInput
    auditLogs?: AuditLogUncheckedUpdateManyWithoutPerformedByNestedInput
  }

  export type UserCreateManyInput = {
    id?: number
    name: string
    loginIdentifier: string
    passwordHash: string
    role: $Enums.Role
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
    loginIdentifier?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    loginIdentifier?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SwapRequestCreateInput = {
    employeeIdOut: string
    employeeIdIn: string
    swapDate: Date | string
    paybackDate: Date | string
    employeeFunction: $Enums.EmployeeFunction
    groupOut: $Enums.ReliefGroup
    groupIn: $Enums.ReliefGroup
    eventType: $Enums.SwapEventType
    status?: $Enums.SwapStatus
    observation?: string | null
    isMirror?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    submittedBy: UserCreateNestedOneWithoutSubmittedRequestsInput
    originalRequest?: SwapRequestCreateNestedOneWithoutMirrorRequestInput
    mirrorRequest?: SwapRequestCreateNestedOneWithoutOriginalRequestInput
  }

  export type SwapRequestUncheckedCreateInput = {
    id?: number
    employeeIdOut: string
    employeeIdIn: string
    swapDate: Date | string
    paybackDate: Date | string
    employeeFunction: $Enums.EmployeeFunction
    groupOut: $Enums.ReliefGroup
    groupIn: $Enums.ReliefGroup
    eventType: $Enums.SwapEventType
    status?: $Enums.SwapStatus
    observation?: string | null
    submittedById: number
    isMirror?: boolean
    relatedRequestId?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    mirrorRequest?: SwapRequestUncheckedCreateNestedOneWithoutOriginalRequestInput
  }

  export type SwapRequestUpdateInput = {
    employeeIdOut?: StringFieldUpdateOperationsInput | string
    employeeIdIn?: StringFieldUpdateOperationsInput | string
    swapDate?: DateTimeFieldUpdateOperationsInput | Date | string
    paybackDate?: DateTimeFieldUpdateOperationsInput | Date | string
    employeeFunction?: EnumEmployeeFunctionFieldUpdateOperationsInput | $Enums.EmployeeFunction
    groupOut?: EnumReliefGroupFieldUpdateOperationsInput | $Enums.ReliefGroup
    groupIn?: EnumReliefGroupFieldUpdateOperationsInput | $Enums.ReliefGroup
    eventType?: EnumSwapEventTypeFieldUpdateOperationsInput | $Enums.SwapEventType
    status?: EnumSwapStatusFieldUpdateOperationsInput | $Enums.SwapStatus
    observation?: NullableStringFieldUpdateOperationsInput | string | null
    isMirror?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    submittedBy?: UserUpdateOneRequiredWithoutSubmittedRequestsNestedInput
    originalRequest?: SwapRequestUpdateOneWithoutMirrorRequestNestedInput
    mirrorRequest?: SwapRequestUpdateOneWithoutOriginalRequestNestedInput
  }

  export type SwapRequestUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    employeeIdOut?: StringFieldUpdateOperationsInput | string
    employeeIdIn?: StringFieldUpdateOperationsInput | string
    swapDate?: DateTimeFieldUpdateOperationsInput | Date | string
    paybackDate?: DateTimeFieldUpdateOperationsInput | Date | string
    employeeFunction?: EnumEmployeeFunctionFieldUpdateOperationsInput | $Enums.EmployeeFunction
    groupOut?: EnumReliefGroupFieldUpdateOperationsInput | $Enums.ReliefGroup
    groupIn?: EnumReliefGroupFieldUpdateOperationsInput | $Enums.ReliefGroup
    eventType?: EnumSwapEventTypeFieldUpdateOperationsInput | $Enums.SwapEventType
    status?: EnumSwapStatusFieldUpdateOperationsInput | $Enums.SwapStatus
    observation?: NullableStringFieldUpdateOperationsInput | string | null
    submittedById?: IntFieldUpdateOperationsInput | number
    isMirror?: BoolFieldUpdateOperationsInput | boolean
    relatedRequestId?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    mirrorRequest?: SwapRequestUncheckedUpdateOneWithoutOriginalRequestNestedInput
  }

  export type SwapRequestCreateManyInput = {
    id?: number
    employeeIdOut: string
    employeeIdIn: string
    swapDate: Date | string
    paybackDate: Date | string
    employeeFunction: $Enums.EmployeeFunction
    groupOut: $Enums.ReliefGroup
    groupIn: $Enums.ReliefGroup
    eventType: $Enums.SwapEventType
    status?: $Enums.SwapStatus
    observation?: string | null
    submittedById: number
    isMirror?: boolean
    relatedRequestId?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SwapRequestUpdateManyMutationInput = {
    employeeIdOut?: StringFieldUpdateOperationsInput | string
    employeeIdIn?: StringFieldUpdateOperationsInput | string
    swapDate?: DateTimeFieldUpdateOperationsInput | Date | string
    paybackDate?: DateTimeFieldUpdateOperationsInput | Date | string
    employeeFunction?: EnumEmployeeFunctionFieldUpdateOperationsInput | $Enums.EmployeeFunction
    groupOut?: EnumReliefGroupFieldUpdateOperationsInput | $Enums.ReliefGroup
    groupIn?: EnumReliefGroupFieldUpdateOperationsInput | $Enums.ReliefGroup
    eventType?: EnumSwapEventTypeFieldUpdateOperationsInput | $Enums.SwapEventType
    status?: EnumSwapStatusFieldUpdateOperationsInput | $Enums.SwapStatus
    observation?: NullableStringFieldUpdateOperationsInput | string | null
    isMirror?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SwapRequestUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    employeeIdOut?: StringFieldUpdateOperationsInput | string
    employeeIdIn?: StringFieldUpdateOperationsInput | string
    swapDate?: DateTimeFieldUpdateOperationsInput | Date | string
    paybackDate?: DateTimeFieldUpdateOperationsInput | Date | string
    employeeFunction?: EnumEmployeeFunctionFieldUpdateOperationsInput | $Enums.EmployeeFunction
    groupOut?: EnumReliefGroupFieldUpdateOperationsInput | $Enums.ReliefGroup
    groupIn?: EnumReliefGroupFieldUpdateOperationsInput | $Enums.ReliefGroup
    eventType?: EnumSwapEventTypeFieldUpdateOperationsInput | $Enums.SwapEventType
    status?: EnumSwapStatusFieldUpdateOperationsInput | $Enums.SwapStatus
    observation?: NullableStringFieldUpdateOperationsInput | string | null
    submittedById?: IntFieldUpdateOperationsInput | number
    isMirror?: BoolFieldUpdateOperationsInput | boolean
    relatedRequestId?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogCreateInput = {
    timestamp?: Date | string
    action: string
    details?: string | null
    userLoginIdentifier: string
    targetResourceId?: number | null
    targetResourceType?: string | null
    performedBy: UserCreateNestedOneWithoutAuditLogsInput
  }

  export type AuditLogUncheckedCreateInput = {
    id?: number
    timestamp?: Date | string
    action: string
    details?: string | null
    userId: number
    userLoginIdentifier: string
    targetResourceId?: number | null
    targetResourceType?: string | null
  }

  export type AuditLogUpdateInput = {
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    action?: StringFieldUpdateOperationsInput | string
    details?: NullableStringFieldUpdateOperationsInput | string | null
    userLoginIdentifier?: StringFieldUpdateOperationsInput | string
    targetResourceId?: NullableIntFieldUpdateOperationsInput | number | null
    targetResourceType?: NullableStringFieldUpdateOperationsInput | string | null
    performedBy?: UserUpdateOneRequiredWithoutAuditLogsNestedInput
  }

  export type AuditLogUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    action?: StringFieldUpdateOperationsInput | string
    details?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: IntFieldUpdateOperationsInput | number
    userLoginIdentifier?: StringFieldUpdateOperationsInput | string
    targetResourceId?: NullableIntFieldUpdateOperationsInput | number | null
    targetResourceType?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AuditLogCreateManyInput = {
    id?: number
    timestamp?: Date | string
    action: string
    details?: string | null
    userId: number
    userLoginIdentifier: string
    targetResourceId?: number | null
    targetResourceType?: string | null
  }

  export type AuditLogUpdateManyMutationInput = {
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    action?: StringFieldUpdateOperationsInput | string
    details?: NullableStringFieldUpdateOperationsInput | string | null
    userLoginIdentifier?: StringFieldUpdateOperationsInput | string
    targetResourceId?: NullableIntFieldUpdateOperationsInput | number | null
    targetResourceType?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AuditLogUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    action?: StringFieldUpdateOperationsInput | string
    details?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: IntFieldUpdateOperationsInput | number
    userLoginIdentifier?: StringFieldUpdateOperationsInput | string
    targetResourceId?: NullableIntFieldUpdateOperationsInput | number | null
    targetResourceType?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type SettingsCreateInput = {
    id?: number
    submissionStartDay?: $Enums.DayOfWeek
    submissionEndDay?: $Enums.DayOfWeek
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SettingsUncheckedCreateInput = {
    id?: number
    submissionStartDay?: $Enums.DayOfWeek
    submissionEndDay?: $Enums.DayOfWeek
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SettingsUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    submissionStartDay?: EnumDayOfWeekFieldUpdateOperationsInput | $Enums.DayOfWeek
    submissionEndDay?: EnumDayOfWeekFieldUpdateOperationsInput | $Enums.DayOfWeek
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SettingsUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    submissionStartDay?: EnumDayOfWeekFieldUpdateOperationsInput | $Enums.DayOfWeek
    submissionEndDay?: EnumDayOfWeekFieldUpdateOperationsInput | $Enums.DayOfWeek
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SettingsCreateManyInput = {
    id?: number
    submissionStartDay?: $Enums.DayOfWeek
    submissionEndDay?: $Enums.DayOfWeek
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SettingsUpdateManyMutationInput = {
    id?: IntFieldUpdateOperationsInput | number
    submissionStartDay?: EnumDayOfWeekFieldUpdateOperationsInput | $Enums.DayOfWeek
    submissionEndDay?: EnumDayOfWeekFieldUpdateOperationsInput | $Enums.DayOfWeek
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SettingsUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    submissionStartDay?: EnumDayOfWeekFieldUpdateOperationsInput | $Enums.DayOfWeek
    submissionEndDay?: EnumDayOfWeekFieldUpdateOperationsInput | $Enums.DayOfWeek
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type EnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type SwapRequestListRelationFilter = {
    every?: SwapRequestWhereInput
    some?: SwapRequestWhereInput
    none?: SwapRequestWhereInput
  }

  export type AuditLogListRelationFilter = {
    every?: AuditLogWhereInput
    some?: AuditLogWhereInput
    none?: AuditLogWhereInput
  }

  export type SwapRequestOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AuditLogOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    loginIdentifier?: SortOrder
    passwordHash?: SortOrder
    role?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    loginIdentifier?: SortOrder
    passwordHash?: SortOrder
    role?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    loginIdentifier?: SortOrder
    passwordHash?: SortOrder
    role?: SortOrder
    isActive?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type EnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type EnumEmployeeFunctionFilter<$PrismaModel = never> = {
    equals?: $Enums.EmployeeFunction | EnumEmployeeFunctionFieldRefInput<$PrismaModel>
    in?: $Enums.EmployeeFunction[] | ListEnumEmployeeFunctionFieldRefInput<$PrismaModel>
    notIn?: $Enums.EmployeeFunction[] | ListEnumEmployeeFunctionFieldRefInput<$PrismaModel>
    not?: NestedEnumEmployeeFunctionFilter<$PrismaModel> | $Enums.EmployeeFunction
  }

  export type EnumReliefGroupFilter<$PrismaModel = never> = {
    equals?: $Enums.ReliefGroup | EnumReliefGroupFieldRefInput<$PrismaModel>
    in?: $Enums.ReliefGroup[] | ListEnumReliefGroupFieldRefInput<$PrismaModel>
    notIn?: $Enums.ReliefGroup[] | ListEnumReliefGroupFieldRefInput<$PrismaModel>
    not?: NestedEnumReliefGroupFilter<$PrismaModel> | $Enums.ReliefGroup
  }

  export type EnumSwapEventTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.SwapEventType | EnumSwapEventTypeFieldRefInput<$PrismaModel>
    in?: $Enums.SwapEventType[] | ListEnumSwapEventTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.SwapEventType[] | ListEnumSwapEventTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumSwapEventTypeFilter<$PrismaModel> | $Enums.SwapEventType
  }

  export type EnumSwapStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.SwapStatus | EnumSwapStatusFieldRefInput<$PrismaModel>
    in?: $Enums.SwapStatus[] | ListEnumSwapStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.SwapStatus[] | ListEnumSwapStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumSwapStatusFilter<$PrismaModel> | $Enums.SwapStatus
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type SwapRequestNullableScalarRelationFilter = {
    is?: SwapRequestWhereInput | null
    isNot?: SwapRequestWhereInput | null
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type SwapRequestCountOrderByAggregateInput = {
    id?: SortOrder
    employeeIdOut?: SortOrder
    employeeIdIn?: SortOrder
    swapDate?: SortOrder
    paybackDate?: SortOrder
    employeeFunction?: SortOrder
    groupOut?: SortOrder
    groupIn?: SortOrder
    eventType?: SortOrder
    status?: SortOrder
    observation?: SortOrder
    submittedById?: SortOrder
    isMirror?: SortOrder
    relatedRequestId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SwapRequestAvgOrderByAggregateInput = {
    id?: SortOrder
    submittedById?: SortOrder
    relatedRequestId?: SortOrder
  }

  export type SwapRequestMaxOrderByAggregateInput = {
    id?: SortOrder
    employeeIdOut?: SortOrder
    employeeIdIn?: SortOrder
    swapDate?: SortOrder
    paybackDate?: SortOrder
    employeeFunction?: SortOrder
    groupOut?: SortOrder
    groupIn?: SortOrder
    eventType?: SortOrder
    status?: SortOrder
    observation?: SortOrder
    submittedById?: SortOrder
    isMirror?: SortOrder
    relatedRequestId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SwapRequestMinOrderByAggregateInput = {
    id?: SortOrder
    employeeIdOut?: SortOrder
    employeeIdIn?: SortOrder
    swapDate?: SortOrder
    paybackDate?: SortOrder
    employeeFunction?: SortOrder
    groupOut?: SortOrder
    groupIn?: SortOrder
    eventType?: SortOrder
    status?: SortOrder
    observation?: SortOrder
    submittedById?: SortOrder
    isMirror?: SortOrder
    relatedRequestId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SwapRequestSumOrderByAggregateInput = {
    id?: SortOrder
    submittedById?: SortOrder
    relatedRequestId?: SortOrder
  }

  export type EnumEmployeeFunctionWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.EmployeeFunction | EnumEmployeeFunctionFieldRefInput<$PrismaModel>
    in?: $Enums.EmployeeFunction[] | ListEnumEmployeeFunctionFieldRefInput<$PrismaModel>
    notIn?: $Enums.EmployeeFunction[] | ListEnumEmployeeFunctionFieldRefInput<$PrismaModel>
    not?: NestedEnumEmployeeFunctionWithAggregatesFilter<$PrismaModel> | $Enums.EmployeeFunction
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumEmployeeFunctionFilter<$PrismaModel>
    _max?: NestedEnumEmployeeFunctionFilter<$PrismaModel>
  }

  export type EnumReliefGroupWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ReliefGroup | EnumReliefGroupFieldRefInput<$PrismaModel>
    in?: $Enums.ReliefGroup[] | ListEnumReliefGroupFieldRefInput<$PrismaModel>
    notIn?: $Enums.ReliefGroup[] | ListEnumReliefGroupFieldRefInput<$PrismaModel>
    not?: NestedEnumReliefGroupWithAggregatesFilter<$PrismaModel> | $Enums.ReliefGroup
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumReliefGroupFilter<$PrismaModel>
    _max?: NestedEnumReliefGroupFilter<$PrismaModel>
  }

  export type EnumSwapEventTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.SwapEventType | EnumSwapEventTypeFieldRefInput<$PrismaModel>
    in?: $Enums.SwapEventType[] | ListEnumSwapEventTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.SwapEventType[] | ListEnumSwapEventTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumSwapEventTypeWithAggregatesFilter<$PrismaModel> | $Enums.SwapEventType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumSwapEventTypeFilter<$PrismaModel>
    _max?: NestedEnumSwapEventTypeFilter<$PrismaModel>
  }

  export type EnumSwapStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.SwapStatus | EnumSwapStatusFieldRefInput<$PrismaModel>
    in?: $Enums.SwapStatus[] | ListEnumSwapStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.SwapStatus[] | ListEnumSwapStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumSwapStatusWithAggregatesFilter<$PrismaModel> | $Enums.SwapStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumSwapStatusFilter<$PrismaModel>
    _max?: NestedEnumSwapStatusFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type AuditLogCountOrderByAggregateInput = {
    id?: SortOrder
    timestamp?: SortOrder
    action?: SortOrder
    details?: SortOrder
    userId?: SortOrder
    userLoginIdentifier?: SortOrder
    targetResourceId?: SortOrder
    targetResourceType?: SortOrder
  }

  export type AuditLogAvgOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    targetResourceId?: SortOrder
  }

  export type AuditLogMaxOrderByAggregateInput = {
    id?: SortOrder
    timestamp?: SortOrder
    action?: SortOrder
    details?: SortOrder
    userId?: SortOrder
    userLoginIdentifier?: SortOrder
    targetResourceId?: SortOrder
    targetResourceType?: SortOrder
  }

  export type AuditLogMinOrderByAggregateInput = {
    id?: SortOrder
    timestamp?: SortOrder
    action?: SortOrder
    details?: SortOrder
    userId?: SortOrder
    userLoginIdentifier?: SortOrder
    targetResourceId?: SortOrder
    targetResourceType?: SortOrder
  }

  export type AuditLogSumOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    targetResourceId?: SortOrder
  }

  export type EnumDayOfWeekFilter<$PrismaModel = never> = {
    equals?: $Enums.DayOfWeek | EnumDayOfWeekFieldRefInput<$PrismaModel>
    in?: $Enums.DayOfWeek[] | ListEnumDayOfWeekFieldRefInput<$PrismaModel>
    notIn?: $Enums.DayOfWeek[] | ListEnumDayOfWeekFieldRefInput<$PrismaModel>
    not?: NestedEnumDayOfWeekFilter<$PrismaModel> | $Enums.DayOfWeek
  }

  export type SettingsCountOrderByAggregateInput = {
    id?: SortOrder
    submissionStartDay?: SortOrder
    submissionEndDay?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SettingsAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type SettingsMaxOrderByAggregateInput = {
    id?: SortOrder
    submissionStartDay?: SortOrder
    submissionEndDay?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SettingsMinOrderByAggregateInput = {
    id?: SortOrder
    submissionStartDay?: SortOrder
    submissionEndDay?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SettingsSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type EnumDayOfWeekWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.DayOfWeek | EnumDayOfWeekFieldRefInput<$PrismaModel>
    in?: $Enums.DayOfWeek[] | ListEnumDayOfWeekFieldRefInput<$PrismaModel>
    notIn?: $Enums.DayOfWeek[] | ListEnumDayOfWeekFieldRefInput<$PrismaModel>
    not?: NestedEnumDayOfWeekWithAggregatesFilter<$PrismaModel> | $Enums.DayOfWeek
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumDayOfWeekFilter<$PrismaModel>
    _max?: NestedEnumDayOfWeekFilter<$PrismaModel>
  }

  export type SwapRequestCreateNestedManyWithoutSubmittedByInput = {
    create?: XOR<SwapRequestCreateWithoutSubmittedByInput, SwapRequestUncheckedCreateWithoutSubmittedByInput> | SwapRequestCreateWithoutSubmittedByInput[] | SwapRequestUncheckedCreateWithoutSubmittedByInput[]
    connectOrCreate?: SwapRequestCreateOrConnectWithoutSubmittedByInput | SwapRequestCreateOrConnectWithoutSubmittedByInput[]
    createMany?: SwapRequestCreateManySubmittedByInputEnvelope
    connect?: SwapRequestWhereUniqueInput | SwapRequestWhereUniqueInput[]
  }

  export type AuditLogCreateNestedManyWithoutPerformedByInput = {
    create?: XOR<AuditLogCreateWithoutPerformedByInput, AuditLogUncheckedCreateWithoutPerformedByInput> | AuditLogCreateWithoutPerformedByInput[] | AuditLogUncheckedCreateWithoutPerformedByInput[]
    connectOrCreate?: AuditLogCreateOrConnectWithoutPerformedByInput | AuditLogCreateOrConnectWithoutPerformedByInput[]
    createMany?: AuditLogCreateManyPerformedByInputEnvelope
    connect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
  }

  export type SwapRequestUncheckedCreateNestedManyWithoutSubmittedByInput = {
    create?: XOR<SwapRequestCreateWithoutSubmittedByInput, SwapRequestUncheckedCreateWithoutSubmittedByInput> | SwapRequestCreateWithoutSubmittedByInput[] | SwapRequestUncheckedCreateWithoutSubmittedByInput[]
    connectOrCreate?: SwapRequestCreateOrConnectWithoutSubmittedByInput | SwapRequestCreateOrConnectWithoutSubmittedByInput[]
    createMany?: SwapRequestCreateManySubmittedByInputEnvelope
    connect?: SwapRequestWhereUniqueInput | SwapRequestWhereUniqueInput[]
  }

  export type AuditLogUncheckedCreateNestedManyWithoutPerformedByInput = {
    create?: XOR<AuditLogCreateWithoutPerformedByInput, AuditLogUncheckedCreateWithoutPerformedByInput> | AuditLogCreateWithoutPerformedByInput[] | AuditLogUncheckedCreateWithoutPerformedByInput[]
    connectOrCreate?: AuditLogCreateOrConnectWithoutPerformedByInput | AuditLogCreateOrConnectWithoutPerformedByInput[]
    createMany?: AuditLogCreateManyPerformedByInputEnvelope
    connect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type EnumRoleFieldUpdateOperationsInput = {
    set?: $Enums.Role
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type SwapRequestUpdateManyWithoutSubmittedByNestedInput = {
    create?: XOR<SwapRequestCreateWithoutSubmittedByInput, SwapRequestUncheckedCreateWithoutSubmittedByInput> | SwapRequestCreateWithoutSubmittedByInput[] | SwapRequestUncheckedCreateWithoutSubmittedByInput[]
    connectOrCreate?: SwapRequestCreateOrConnectWithoutSubmittedByInput | SwapRequestCreateOrConnectWithoutSubmittedByInput[]
    upsert?: SwapRequestUpsertWithWhereUniqueWithoutSubmittedByInput | SwapRequestUpsertWithWhereUniqueWithoutSubmittedByInput[]
    createMany?: SwapRequestCreateManySubmittedByInputEnvelope
    set?: SwapRequestWhereUniqueInput | SwapRequestWhereUniqueInput[]
    disconnect?: SwapRequestWhereUniqueInput | SwapRequestWhereUniqueInput[]
    delete?: SwapRequestWhereUniqueInput | SwapRequestWhereUniqueInput[]
    connect?: SwapRequestWhereUniqueInput | SwapRequestWhereUniqueInput[]
    update?: SwapRequestUpdateWithWhereUniqueWithoutSubmittedByInput | SwapRequestUpdateWithWhereUniqueWithoutSubmittedByInput[]
    updateMany?: SwapRequestUpdateManyWithWhereWithoutSubmittedByInput | SwapRequestUpdateManyWithWhereWithoutSubmittedByInput[]
    deleteMany?: SwapRequestScalarWhereInput | SwapRequestScalarWhereInput[]
  }

  export type AuditLogUpdateManyWithoutPerformedByNestedInput = {
    create?: XOR<AuditLogCreateWithoutPerformedByInput, AuditLogUncheckedCreateWithoutPerformedByInput> | AuditLogCreateWithoutPerformedByInput[] | AuditLogUncheckedCreateWithoutPerformedByInput[]
    connectOrCreate?: AuditLogCreateOrConnectWithoutPerformedByInput | AuditLogCreateOrConnectWithoutPerformedByInput[]
    upsert?: AuditLogUpsertWithWhereUniqueWithoutPerformedByInput | AuditLogUpsertWithWhereUniqueWithoutPerformedByInput[]
    createMany?: AuditLogCreateManyPerformedByInputEnvelope
    set?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    disconnect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    delete?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    connect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    update?: AuditLogUpdateWithWhereUniqueWithoutPerformedByInput | AuditLogUpdateWithWhereUniqueWithoutPerformedByInput[]
    updateMany?: AuditLogUpdateManyWithWhereWithoutPerformedByInput | AuditLogUpdateManyWithWhereWithoutPerformedByInput[]
    deleteMany?: AuditLogScalarWhereInput | AuditLogScalarWhereInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type SwapRequestUncheckedUpdateManyWithoutSubmittedByNestedInput = {
    create?: XOR<SwapRequestCreateWithoutSubmittedByInput, SwapRequestUncheckedCreateWithoutSubmittedByInput> | SwapRequestCreateWithoutSubmittedByInput[] | SwapRequestUncheckedCreateWithoutSubmittedByInput[]
    connectOrCreate?: SwapRequestCreateOrConnectWithoutSubmittedByInput | SwapRequestCreateOrConnectWithoutSubmittedByInput[]
    upsert?: SwapRequestUpsertWithWhereUniqueWithoutSubmittedByInput | SwapRequestUpsertWithWhereUniqueWithoutSubmittedByInput[]
    createMany?: SwapRequestCreateManySubmittedByInputEnvelope
    set?: SwapRequestWhereUniqueInput | SwapRequestWhereUniqueInput[]
    disconnect?: SwapRequestWhereUniqueInput | SwapRequestWhereUniqueInput[]
    delete?: SwapRequestWhereUniqueInput | SwapRequestWhereUniqueInput[]
    connect?: SwapRequestWhereUniqueInput | SwapRequestWhereUniqueInput[]
    update?: SwapRequestUpdateWithWhereUniqueWithoutSubmittedByInput | SwapRequestUpdateWithWhereUniqueWithoutSubmittedByInput[]
    updateMany?: SwapRequestUpdateManyWithWhereWithoutSubmittedByInput | SwapRequestUpdateManyWithWhereWithoutSubmittedByInput[]
    deleteMany?: SwapRequestScalarWhereInput | SwapRequestScalarWhereInput[]
  }

  export type AuditLogUncheckedUpdateManyWithoutPerformedByNestedInput = {
    create?: XOR<AuditLogCreateWithoutPerformedByInput, AuditLogUncheckedCreateWithoutPerformedByInput> | AuditLogCreateWithoutPerformedByInput[] | AuditLogUncheckedCreateWithoutPerformedByInput[]
    connectOrCreate?: AuditLogCreateOrConnectWithoutPerformedByInput | AuditLogCreateOrConnectWithoutPerformedByInput[]
    upsert?: AuditLogUpsertWithWhereUniqueWithoutPerformedByInput | AuditLogUpsertWithWhereUniqueWithoutPerformedByInput[]
    createMany?: AuditLogCreateManyPerformedByInputEnvelope
    set?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    disconnect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    delete?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    connect?: AuditLogWhereUniqueInput | AuditLogWhereUniqueInput[]
    update?: AuditLogUpdateWithWhereUniqueWithoutPerformedByInput | AuditLogUpdateWithWhereUniqueWithoutPerformedByInput[]
    updateMany?: AuditLogUpdateManyWithWhereWithoutPerformedByInput | AuditLogUpdateManyWithWhereWithoutPerformedByInput[]
    deleteMany?: AuditLogScalarWhereInput | AuditLogScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutSubmittedRequestsInput = {
    create?: XOR<UserCreateWithoutSubmittedRequestsInput, UserUncheckedCreateWithoutSubmittedRequestsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSubmittedRequestsInput
    connect?: UserWhereUniqueInput
  }

  export type SwapRequestCreateNestedOneWithoutMirrorRequestInput = {
    create?: XOR<SwapRequestCreateWithoutMirrorRequestInput, SwapRequestUncheckedCreateWithoutMirrorRequestInput>
    connectOrCreate?: SwapRequestCreateOrConnectWithoutMirrorRequestInput
    connect?: SwapRequestWhereUniqueInput
  }

  export type SwapRequestCreateNestedOneWithoutOriginalRequestInput = {
    create?: XOR<SwapRequestCreateWithoutOriginalRequestInput, SwapRequestUncheckedCreateWithoutOriginalRequestInput>
    connectOrCreate?: SwapRequestCreateOrConnectWithoutOriginalRequestInput
    connect?: SwapRequestWhereUniqueInput
  }

  export type SwapRequestUncheckedCreateNestedOneWithoutOriginalRequestInput = {
    create?: XOR<SwapRequestCreateWithoutOriginalRequestInput, SwapRequestUncheckedCreateWithoutOriginalRequestInput>
    connectOrCreate?: SwapRequestCreateOrConnectWithoutOriginalRequestInput
    connect?: SwapRequestWhereUniqueInput
  }

  export type EnumEmployeeFunctionFieldUpdateOperationsInput = {
    set?: $Enums.EmployeeFunction
  }

  export type EnumReliefGroupFieldUpdateOperationsInput = {
    set?: $Enums.ReliefGroup
  }

  export type EnumSwapEventTypeFieldUpdateOperationsInput = {
    set?: $Enums.SwapEventType
  }

  export type EnumSwapStatusFieldUpdateOperationsInput = {
    set?: $Enums.SwapStatus
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type UserUpdateOneRequiredWithoutSubmittedRequestsNestedInput = {
    create?: XOR<UserCreateWithoutSubmittedRequestsInput, UserUncheckedCreateWithoutSubmittedRequestsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSubmittedRequestsInput
    upsert?: UserUpsertWithoutSubmittedRequestsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutSubmittedRequestsInput, UserUpdateWithoutSubmittedRequestsInput>, UserUncheckedUpdateWithoutSubmittedRequestsInput>
  }

  export type SwapRequestUpdateOneWithoutMirrorRequestNestedInput = {
    create?: XOR<SwapRequestCreateWithoutMirrorRequestInput, SwapRequestUncheckedCreateWithoutMirrorRequestInput>
    connectOrCreate?: SwapRequestCreateOrConnectWithoutMirrorRequestInput
    upsert?: SwapRequestUpsertWithoutMirrorRequestInput
    disconnect?: SwapRequestWhereInput | boolean
    delete?: SwapRequestWhereInput | boolean
    connect?: SwapRequestWhereUniqueInput
    update?: XOR<XOR<SwapRequestUpdateToOneWithWhereWithoutMirrorRequestInput, SwapRequestUpdateWithoutMirrorRequestInput>, SwapRequestUncheckedUpdateWithoutMirrorRequestInput>
  }

  export type SwapRequestUpdateOneWithoutOriginalRequestNestedInput = {
    create?: XOR<SwapRequestCreateWithoutOriginalRequestInput, SwapRequestUncheckedCreateWithoutOriginalRequestInput>
    connectOrCreate?: SwapRequestCreateOrConnectWithoutOriginalRequestInput
    upsert?: SwapRequestUpsertWithoutOriginalRequestInput
    disconnect?: SwapRequestWhereInput | boolean
    delete?: SwapRequestWhereInput | boolean
    connect?: SwapRequestWhereUniqueInput
    update?: XOR<XOR<SwapRequestUpdateToOneWithWhereWithoutOriginalRequestInput, SwapRequestUpdateWithoutOriginalRequestInput>, SwapRequestUncheckedUpdateWithoutOriginalRequestInput>
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type SwapRequestUncheckedUpdateOneWithoutOriginalRequestNestedInput = {
    create?: XOR<SwapRequestCreateWithoutOriginalRequestInput, SwapRequestUncheckedCreateWithoutOriginalRequestInput>
    connectOrCreate?: SwapRequestCreateOrConnectWithoutOriginalRequestInput
    upsert?: SwapRequestUpsertWithoutOriginalRequestInput
    disconnect?: SwapRequestWhereInput | boolean
    delete?: SwapRequestWhereInput | boolean
    connect?: SwapRequestWhereUniqueInput
    update?: XOR<XOR<SwapRequestUpdateToOneWithWhereWithoutOriginalRequestInput, SwapRequestUpdateWithoutOriginalRequestInput>, SwapRequestUncheckedUpdateWithoutOriginalRequestInput>
  }

  export type UserCreateNestedOneWithoutAuditLogsInput = {
    create?: XOR<UserCreateWithoutAuditLogsInput, UserUncheckedCreateWithoutAuditLogsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAuditLogsInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutAuditLogsNestedInput = {
    create?: XOR<UserCreateWithoutAuditLogsInput, UserUncheckedCreateWithoutAuditLogsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAuditLogsInput
    upsert?: UserUpsertWithoutAuditLogsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutAuditLogsInput, UserUpdateWithoutAuditLogsInput>, UserUncheckedUpdateWithoutAuditLogsInput>
  }

  export type EnumDayOfWeekFieldUpdateOperationsInput = {
    set?: $Enums.DayOfWeek
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedEnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedEnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedEnumEmployeeFunctionFilter<$PrismaModel = never> = {
    equals?: $Enums.EmployeeFunction | EnumEmployeeFunctionFieldRefInput<$PrismaModel>
    in?: $Enums.EmployeeFunction[] | ListEnumEmployeeFunctionFieldRefInput<$PrismaModel>
    notIn?: $Enums.EmployeeFunction[] | ListEnumEmployeeFunctionFieldRefInput<$PrismaModel>
    not?: NestedEnumEmployeeFunctionFilter<$PrismaModel> | $Enums.EmployeeFunction
  }

  export type NestedEnumReliefGroupFilter<$PrismaModel = never> = {
    equals?: $Enums.ReliefGroup | EnumReliefGroupFieldRefInput<$PrismaModel>
    in?: $Enums.ReliefGroup[] | ListEnumReliefGroupFieldRefInput<$PrismaModel>
    notIn?: $Enums.ReliefGroup[] | ListEnumReliefGroupFieldRefInput<$PrismaModel>
    not?: NestedEnumReliefGroupFilter<$PrismaModel> | $Enums.ReliefGroup
  }

  export type NestedEnumSwapEventTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.SwapEventType | EnumSwapEventTypeFieldRefInput<$PrismaModel>
    in?: $Enums.SwapEventType[] | ListEnumSwapEventTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.SwapEventType[] | ListEnumSwapEventTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumSwapEventTypeFilter<$PrismaModel> | $Enums.SwapEventType
  }

  export type NestedEnumSwapStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.SwapStatus | EnumSwapStatusFieldRefInput<$PrismaModel>
    in?: $Enums.SwapStatus[] | ListEnumSwapStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.SwapStatus[] | ListEnumSwapStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumSwapStatusFilter<$PrismaModel> | $Enums.SwapStatus
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedEnumEmployeeFunctionWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.EmployeeFunction | EnumEmployeeFunctionFieldRefInput<$PrismaModel>
    in?: $Enums.EmployeeFunction[] | ListEnumEmployeeFunctionFieldRefInput<$PrismaModel>
    notIn?: $Enums.EmployeeFunction[] | ListEnumEmployeeFunctionFieldRefInput<$PrismaModel>
    not?: NestedEnumEmployeeFunctionWithAggregatesFilter<$PrismaModel> | $Enums.EmployeeFunction
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumEmployeeFunctionFilter<$PrismaModel>
    _max?: NestedEnumEmployeeFunctionFilter<$PrismaModel>
  }

  export type NestedEnumReliefGroupWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ReliefGroup | EnumReliefGroupFieldRefInput<$PrismaModel>
    in?: $Enums.ReliefGroup[] | ListEnumReliefGroupFieldRefInput<$PrismaModel>
    notIn?: $Enums.ReliefGroup[] | ListEnumReliefGroupFieldRefInput<$PrismaModel>
    not?: NestedEnumReliefGroupWithAggregatesFilter<$PrismaModel> | $Enums.ReliefGroup
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumReliefGroupFilter<$PrismaModel>
    _max?: NestedEnumReliefGroupFilter<$PrismaModel>
  }

  export type NestedEnumSwapEventTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.SwapEventType | EnumSwapEventTypeFieldRefInput<$PrismaModel>
    in?: $Enums.SwapEventType[] | ListEnumSwapEventTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.SwapEventType[] | ListEnumSwapEventTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumSwapEventTypeWithAggregatesFilter<$PrismaModel> | $Enums.SwapEventType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumSwapEventTypeFilter<$PrismaModel>
    _max?: NestedEnumSwapEventTypeFilter<$PrismaModel>
  }

  export type NestedEnumSwapStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.SwapStatus | EnumSwapStatusFieldRefInput<$PrismaModel>
    in?: $Enums.SwapStatus[] | ListEnumSwapStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.SwapStatus[] | ListEnumSwapStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumSwapStatusWithAggregatesFilter<$PrismaModel> | $Enums.SwapStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumSwapStatusFilter<$PrismaModel>
    _max?: NestedEnumSwapStatusFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedEnumDayOfWeekFilter<$PrismaModel = never> = {
    equals?: $Enums.DayOfWeek | EnumDayOfWeekFieldRefInput<$PrismaModel>
    in?: $Enums.DayOfWeek[] | ListEnumDayOfWeekFieldRefInput<$PrismaModel>
    notIn?: $Enums.DayOfWeek[] | ListEnumDayOfWeekFieldRefInput<$PrismaModel>
    not?: NestedEnumDayOfWeekFilter<$PrismaModel> | $Enums.DayOfWeek
  }

  export type NestedEnumDayOfWeekWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.DayOfWeek | EnumDayOfWeekFieldRefInput<$PrismaModel>
    in?: $Enums.DayOfWeek[] | ListEnumDayOfWeekFieldRefInput<$PrismaModel>
    notIn?: $Enums.DayOfWeek[] | ListEnumDayOfWeekFieldRefInput<$PrismaModel>
    not?: NestedEnumDayOfWeekWithAggregatesFilter<$PrismaModel> | $Enums.DayOfWeek
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumDayOfWeekFilter<$PrismaModel>
    _max?: NestedEnumDayOfWeekFilter<$PrismaModel>
  }

  export type SwapRequestCreateWithoutSubmittedByInput = {
    employeeIdOut: string
    employeeIdIn: string
    swapDate: Date | string
    paybackDate: Date | string
    employeeFunction: $Enums.EmployeeFunction
    groupOut: $Enums.ReliefGroup
    groupIn: $Enums.ReliefGroup
    eventType: $Enums.SwapEventType
    status?: $Enums.SwapStatus
    observation?: string | null
    isMirror?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    originalRequest?: SwapRequestCreateNestedOneWithoutMirrorRequestInput
    mirrorRequest?: SwapRequestCreateNestedOneWithoutOriginalRequestInput
  }

  export type SwapRequestUncheckedCreateWithoutSubmittedByInput = {
    id?: number
    employeeIdOut: string
    employeeIdIn: string
    swapDate: Date | string
    paybackDate: Date | string
    employeeFunction: $Enums.EmployeeFunction
    groupOut: $Enums.ReliefGroup
    groupIn: $Enums.ReliefGroup
    eventType: $Enums.SwapEventType
    status?: $Enums.SwapStatus
    observation?: string | null
    isMirror?: boolean
    relatedRequestId?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    mirrorRequest?: SwapRequestUncheckedCreateNestedOneWithoutOriginalRequestInput
  }

  export type SwapRequestCreateOrConnectWithoutSubmittedByInput = {
    where: SwapRequestWhereUniqueInput
    create: XOR<SwapRequestCreateWithoutSubmittedByInput, SwapRequestUncheckedCreateWithoutSubmittedByInput>
  }

  export type SwapRequestCreateManySubmittedByInputEnvelope = {
    data: SwapRequestCreateManySubmittedByInput | SwapRequestCreateManySubmittedByInput[]
    skipDuplicates?: boolean
  }

  export type AuditLogCreateWithoutPerformedByInput = {
    timestamp?: Date | string
    action: string
    details?: string | null
    userLoginIdentifier: string
    targetResourceId?: number | null
    targetResourceType?: string | null
  }

  export type AuditLogUncheckedCreateWithoutPerformedByInput = {
    id?: number
    timestamp?: Date | string
    action: string
    details?: string | null
    userLoginIdentifier: string
    targetResourceId?: number | null
    targetResourceType?: string | null
  }

  export type AuditLogCreateOrConnectWithoutPerformedByInput = {
    where: AuditLogWhereUniqueInput
    create: XOR<AuditLogCreateWithoutPerformedByInput, AuditLogUncheckedCreateWithoutPerformedByInput>
  }

  export type AuditLogCreateManyPerformedByInputEnvelope = {
    data: AuditLogCreateManyPerformedByInput | AuditLogCreateManyPerformedByInput[]
    skipDuplicates?: boolean
  }

  export type SwapRequestUpsertWithWhereUniqueWithoutSubmittedByInput = {
    where: SwapRequestWhereUniqueInput
    update: XOR<SwapRequestUpdateWithoutSubmittedByInput, SwapRequestUncheckedUpdateWithoutSubmittedByInput>
    create: XOR<SwapRequestCreateWithoutSubmittedByInput, SwapRequestUncheckedCreateWithoutSubmittedByInput>
  }

  export type SwapRequestUpdateWithWhereUniqueWithoutSubmittedByInput = {
    where: SwapRequestWhereUniqueInput
    data: XOR<SwapRequestUpdateWithoutSubmittedByInput, SwapRequestUncheckedUpdateWithoutSubmittedByInput>
  }

  export type SwapRequestUpdateManyWithWhereWithoutSubmittedByInput = {
    where: SwapRequestScalarWhereInput
    data: XOR<SwapRequestUpdateManyMutationInput, SwapRequestUncheckedUpdateManyWithoutSubmittedByInput>
  }

  export type SwapRequestScalarWhereInput = {
    AND?: SwapRequestScalarWhereInput | SwapRequestScalarWhereInput[]
    OR?: SwapRequestScalarWhereInput[]
    NOT?: SwapRequestScalarWhereInput | SwapRequestScalarWhereInput[]
    id?: IntFilter<"SwapRequest"> | number
    employeeIdOut?: StringFilter<"SwapRequest"> | string
    employeeIdIn?: StringFilter<"SwapRequest"> | string
    swapDate?: DateTimeFilter<"SwapRequest"> | Date | string
    paybackDate?: DateTimeFilter<"SwapRequest"> | Date | string
    employeeFunction?: EnumEmployeeFunctionFilter<"SwapRequest"> | $Enums.EmployeeFunction
    groupOut?: EnumReliefGroupFilter<"SwapRequest"> | $Enums.ReliefGroup
    groupIn?: EnumReliefGroupFilter<"SwapRequest"> | $Enums.ReliefGroup
    eventType?: EnumSwapEventTypeFilter<"SwapRequest"> | $Enums.SwapEventType
    status?: EnumSwapStatusFilter<"SwapRequest"> | $Enums.SwapStatus
    observation?: StringNullableFilter<"SwapRequest"> | string | null
    submittedById?: IntFilter<"SwapRequest"> | number
    isMirror?: BoolFilter<"SwapRequest"> | boolean
    relatedRequestId?: IntNullableFilter<"SwapRequest"> | number | null
    createdAt?: DateTimeFilter<"SwapRequest"> | Date | string
    updatedAt?: DateTimeFilter<"SwapRequest"> | Date | string
  }

  export type AuditLogUpsertWithWhereUniqueWithoutPerformedByInput = {
    where: AuditLogWhereUniqueInput
    update: XOR<AuditLogUpdateWithoutPerformedByInput, AuditLogUncheckedUpdateWithoutPerformedByInput>
    create: XOR<AuditLogCreateWithoutPerformedByInput, AuditLogUncheckedCreateWithoutPerformedByInput>
  }

  export type AuditLogUpdateWithWhereUniqueWithoutPerformedByInput = {
    where: AuditLogWhereUniqueInput
    data: XOR<AuditLogUpdateWithoutPerformedByInput, AuditLogUncheckedUpdateWithoutPerformedByInput>
  }

  export type AuditLogUpdateManyWithWhereWithoutPerformedByInput = {
    where: AuditLogScalarWhereInput
    data: XOR<AuditLogUpdateManyMutationInput, AuditLogUncheckedUpdateManyWithoutPerformedByInput>
  }

  export type AuditLogScalarWhereInput = {
    AND?: AuditLogScalarWhereInput | AuditLogScalarWhereInput[]
    OR?: AuditLogScalarWhereInput[]
    NOT?: AuditLogScalarWhereInput | AuditLogScalarWhereInput[]
    id?: IntFilter<"AuditLog"> | number
    timestamp?: DateTimeFilter<"AuditLog"> | Date | string
    action?: StringFilter<"AuditLog"> | string
    details?: StringNullableFilter<"AuditLog"> | string | null
    userId?: IntFilter<"AuditLog"> | number
    userLoginIdentifier?: StringFilter<"AuditLog"> | string
    targetResourceId?: IntNullableFilter<"AuditLog"> | number | null
    targetResourceType?: StringNullableFilter<"AuditLog"> | string | null
  }

  export type UserCreateWithoutSubmittedRequestsInput = {
    name: string
    loginIdentifier: string
    passwordHash: string
    role: $Enums.Role
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    auditLogs?: AuditLogCreateNestedManyWithoutPerformedByInput
  }

  export type UserUncheckedCreateWithoutSubmittedRequestsInput = {
    id?: number
    name: string
    loginIdentifier: string
    passwordHash: string
    role: $Enums.Role
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    auditLogs?: AuditLogUncheckedCreateNestedManyWithoutPerformedByInput
  }

  export type UserCreateOrConnectWithoutSubmittedRequestsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutSubmittedRequestsInput, UserUncheckedCreateWithoutSubmittedRequestsInput>
  }

  export type SwapRequestCreateWithoutMirrorRequestInput = {
    employeeIdOut: string
    employeeIdIn: string
    swapDate: Date | string
    paybackDate: Date | string
    employeeFunction: $Enums.EmployeeFunction
    groupOut: $Enums.ReliefGroup
    groupIn: $Enums.ReliefGroup
    eventType: $Enums.SwapEventType
    status?: $Enums.SwapStatus
    observation?: string | null
    isMirror?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    submittedBy: UserCreateNestedOneWithoutSubmittedRequestsInput
    originalRequest?: SwapRequestCreateNestedOneWithoutMirrorRequestInput
  }

  export type SwapRequestUncheckedCreateWithoutMirrorRequestInput = {
    id?: number
    employeeIdOut: string
    employeeIdIn: string
    swapDate: Date | string
    paybackDate: Date | string
    employeeFunction: $Enums.EmployeeFunction
    groupOut: $Enums.ReliefGroup
    groupIn: $Enums.ReliefGroup
    eventType: $Enums.SwapEventType
    status?: $Enums.SwapStatus
    observation?: string | null
    submittedById: number
    isMirror?: boolean
    relatedRequestId?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SwapRequestCreateOrConnectWithoutMirrorRequestInput = {
    where: SwapRequestWhereUniqueInput
    create: XOR<SwapRequestCreateWithoutMirrorRequestInput, SwapRequestUncheckedCreateWithoutMirrorRequestInput>
  }

  export type SwapRequestCreateWithoutOriginalRequestInput = {
    employeeIdOut: string
    employeeIdIn: string
    swapDate: Date | string
    paybackDate: Date | string
    employeeFunction: $Enums.EmployeeFunction
    groupOut: $Enums.ReliefGroup
    groupIn: $Enums.ReliefGroup
    eventType: $Enums.SwapEventType
    status?: $Enums.SwapStatus
    observation?: string | null
    isMirror?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    submittedBy: UserCreateNestedOneWithoutSubmittedRequestsInput
    mirrorRequest?: SwapRequestCreateNestedOneWithoutOriginalRequestInput
  }

  export type SwapRequestUncheckedCreateWithoutOriginalRequestInput = {
    id?: number
    employeeIdOut: string
    employeeIdIn: string
    swapDate: Date | string
    paybackDate: Date | string
    employeeFunction: $Enums.EmployeeFunction
    groupOut: $Enums.ReliefGroup
    groupIn: $Enums.ReliefGroup
    eventType: $Enums.SwapEventType
    status?: $Enums.SwapStatus
    observation?: string | null
    submittedById: number
    isMirror?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    mirrorRequest?: SwapRequestUncheckedCreateNestedOneWithoutOriginalRequestInput
  }

  export type SwapRequestCreateOrConnectWithoutOriginalRequestInput = {
    where: SwapRequestWhereUniqueInput
    create: XOR<SwapRequestCreateWithoutOriginalRequestInput, SwapRequestUncheckedCreateWithoutOriginalRequestInput>
  }

  export type UserUpsertWithoutSubmittedRequestsInput = {
    update: XOR<UserUpdateWithoutSubmittedRequestsInput, UserUncheckedUpdateWithoutSubmittedRequestsInput>
    create: XOR<UserCreateWithoutSubmittedRequestsInput, UserUncheckedCreateWithoutSubmittedRequestsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutSubmittedRequestsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutSubmittedRequestsInput, UserUncheckedUpdateWithoutSubmittedRequestsInput>
  }

  export type UserUpdateWithoutSubmittedRequestsInput = {
    name?: StringFieldUpdateOperationsInput | string
    loginIdentifier?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    auditLogs?: AuditLogUpdateManyWithoutPerformedByNestedInput
  }

  export type UserUncheckedUpdateWithoutSubmittedRequestsInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    loginIdentifier?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    auditLogs?: AuditLogUncheckedUpdateManyWithoutPerformedByNestedInput
  }

  export type SwapRequestUpsertWithoutMirrorRequestInput = {
    update: XOR<SwapRequestUpdateWithoutMirrorRequestInput, SwapRequestUncheckedUpdateWithoutMirrorRequestInput>
    create: XOR<SwapRequestCreateWithoutMirrorRequestInput, SwapRequestUncheckedCreateWithoutMirrorRequestInput>
    where?: SwapRequestWhereInput
  }

  export type SwapRequestUpdateToOneWithWhereWithoutMirrorRequestInput = {
    where?: SwapRequestWhereInput
    data: XOR<SwapRequestUpdateWithoutMirrorRequestInput, SwapRequestUncheckedUpdateWithoutMirrorRequestInput>
  }

  export type SwapRequestUpdateWithoutMirrorRequestInput = {
    employeeIdOut?: StringFieldUpdateOperationsInput | string
    employeeIdIn?: StringFieldUpdateOperationsInput | string
    swapDate?: DateTimeFieldUpdateOperationsInput | Date | string
    paybackDate?: DateTimeFieldUpdateOperationsInput | Date | string
    employeeFunction?: EnumEmployeeFunctionFieldUpdateOperationsInput | $Enums.EmployeeFunction
    groupOut?: EnumReliefGroupFieldUpdateOperationsInput | $Enums.ReliefGroup
    groupIn?: EnumReliefGroupFieldUpdateOperationsInput | $Enums.ReliefGroup
    eventType?: EnumSwapEventTypeFieldUpdateOperationsInput | $Enums.SwapEventType
    status?: EnumSwapStatusFieldUpdateOperationsInput | $Enums.SwapStatus
    observation?: NullableStringFieldUpdateOperationsInput | string | null
    isMirror?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    submittedBy?: UserUpdateOneRequiredWithoutSubmittedRequestsNestedInput
    originalRequest?: SwapRequestUpdateOneWithoutMirrorRequestNestedInput
  }

  export type SwapRequestUncheckedUpdateWithoutMirrorRequestInput = {
    id?: IntFieldUpdateOperationsInput | number
    employeeIdOut?: StringFieldUpdateOperationsInput | string
    employeeIdIn?: StringFieldUpdateOperationsInput | string
    swapDate?: DateTimeFieldUpdateOperationsInput | Date | string
    paybackDate?: DateTimeFieldUpdateOperationsInput | Date | string
    employeeFunction?: EnumEmployeeFunctionFieldUpdateOperationsInput | $Enums.EmployeeFunction
    groupOut?: EnumReliefGroupFieldUpdateOperationsInput | $Enums.ReliefGroup
    groupIn?: EnumReliefGroupFieldUpdateOperationsInput | $Enums.ReliefGroup
    eventType?: EnumSwapEventTypeFieldUpdateOperationsInput | $Enums.SwapEventType
    status?: EnumSwapStatusFieldUpdateOperationsInput | $Enums.SwapStatus
    observation?: NullableStringFieldUpdateOperationsInput | string | null
    submittedById?: IntFieldUpdateOperationsInput | number
    isMirror?: BoolFieldUpdateOperationsInput | boolean
    relatedRequestId?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SwapRequestUpsertWithoutOriginalRequestInput = {
    update: XOR<SwapRequestUpdateWithoutOriginalRequestInput, SwapRequestUncheckedUpdateWithoutOriginalRequestInput>
    create: XOR<SwapRequestCreateWithoutOriginalRequestInput, SwapRequestUncheckedCreateWithoutOriginalRequestInput>
    where?: SwapRequestWhereInput
  }

  export type SwapRequestUpdateToOneWithWhereWithoutOriginalRequestInput = {
    where?: SwapRequestWhereInput
    data: XOR<SwapRequestUpdateWithoutOriginalRequestInput, SwapRequestUncheckedUpdateWithoutOriginalRequestInput>
  }

  export type SwapRequestUpdateWithoutOriginalRequestInput = {
    employeeIdOut?: StringFieldUpdateOperationsInput | string
    employeeIdIn?: StringFieldUpdateOperationsInput | string
    swapDate?: DateTimeFieldUpdateOperationsInput | Date | string
    paybackDate?: DateTimeFieldUpdateOperationsInput | Date | string
    employeeFunction?: EnumEmployeeFunctionFieldUpdateOperationsInput | $Enums.EmployeeFunction
    groupOut?: EnumReliefGroupFieldUpdateOperationsInput | $Enums.ReliefGroup
    groupIn?: EnumReliefGroupFieldUpdateOperationsInput | $Enums.ReliefGroup
    eventType?: EnumSwapEventTypeFieldUpdateOperationsInput | $Enums.SwapEventType
    status?: EnumSwapStatusFieldUpdateOperationsInput | $Enums.SwapStatus
    observation?: NullableStringFieldUpdateOperationsInput | string | null
    isMirror?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    submittedBy?: UserUpdateOneRequiredWithoutSubmittedRequestsNestedInput
    mirrorRequest?: SwapRequestUpdateOneWithoutOriginalRequestNestedInput
  }

  export type SwapRequestUncheckedUpdateWithoutOriginalRequestInput = {
    id?: IntFieldUpdateOperationsInput | number
    employeeIdOut?: StringFieldUpdateOperationsInput | string
    employeeIdIn?: StringFieldUpdateOperationsInput | string
    swapDate?: DateTimeFieldUpdateOperationsInput | Date | string
    paybackDate?: DateTimeFieldUpdateOperationsInput | Date | string
    employeeFunction?: EnumEmployeeFunctionFieldUpdateOperationsInput | $Enums.EmployeeFunction
    groupOut?: EnumReliefGroupFieldUpdateOperationsInput | $Enums.ReliefGroup
    groupIn?: EnumReliefGroupFieldUpdateOperationsInput | $Enums.ReliefGroup
    eventType?: EnumSwapEventTypeFieldUpdateOperationsInput | $Enums.SwapEventType
    status?: EnumSwapStatusFieldUpdateOperationsInput | $Enums.SwapStatus
    observation?: NullableStringFieldUpdateOperationsInput | string | null
    submittedById?: IntFieldUpdateOperationsInput | number
    isMirror?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    mirrorRequest?: SwapRequestUncheckedUpdateOneWithoutOriginalRequestNestedInput
  }

  export type UserCreateWithoutAuditLogsInput = {
    name: string
    loginIdentifier: string
    passwordHash: string
    role: $Enums.Role
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    submittedRequests?: SwapRequestCreateNestedManyWithoutSubmittedByInput
  }

  export type UserUncheckedCreateWithoutAuditLogsInput = {
    id?: number
    name: string
    loginIdentifier: string
    passwordHash: string
    role: $Enums.Role
    isActive?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    submittedRequests?: SwapRequestUncheckedCreateNestedManyWithoutSubmittedByInput
  }

  export type UserCreateOrConnectWithoutAuditLogsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutAuditLogsInput, UserUncheckedCreateWithoutAuditLogsInput>
  }

  export type UserUpsertWithoutAuditLogsInput = {
    update: XOR<UserUpdateWithoutAuditLogsInput, UserUncheckedUpdateWithoutAuditLogsInput>
    create: XOR<UserCreateWithoutAuditLogsInput, UserUncheckedCreateWithoutAuditLogsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutAuditLogsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutAuditLogsInput, UserUncheckedUpdateWithoutAuditLogsInput>
  }

  export type UserUpdateWithoutAuditLogsInput = {
    name?: StringFieldUpdateOperationsInput | string
    loginIdentifier?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    submittedRequests?: SwapRequestUpdateManyWithoutSubmittedByNestedInput
  }

  export type UserUncheckedUpdateWithoutAuditLogsInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    loginIdentifier?: StringFieldUpdateOperationsInput | string
    passwordHash?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    isActive?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    submittedRequests?: SwapRequestUncheckedUpdateManyWithoutSubmittedByNestedInput
  }

  export type SwapRequestCreateManySubmittedByInput = {
    id?: number
    employeeIdOut: string
    employeeIdIn: string
    swapDate: Date | string
    paybackDate: Date | string
    employeeFunction: $Enums.EmployeeFunction
    groupOut: $Enums.ReliefGroup
    groupIn: $Enums.ReliefGroup
    eventType: $Enums.SwapEventType
    status?: $Enums.SwapStatus
    observation?: string | null
    isMirror?: boolean
    relatedRequestId?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AuditLogCreateManyPerformedByInput = {
    id?: number
    timestamp?: Date | string
    action: string
    details?: string | null
    userLoginIdentifier: string
    targetResourceId?: number | null
    targetResourceType?: string | null
  }

  export type SwapRequestUpdateWithoutSubmittedByInput = {
    employeeIdOut?: StringFieldUpdateOperationsInput | string
    employeeIdIn?: StringFieldUpdateOperationsInput | string
    swapDate?: DateTimeFieldUpdateOperationsInput | Date | string
    paybackDate?: DateTimeFieldUpdateOperationsInput | Date | string
    employeeFunction?: EnumEmployeeFunctionFieldUpdateOperationsInput | $Enums.EmployeeFunction
    groupOut?: EnumReliefGroupFieldUpdateOperationsInput | $Enums.ReliefGroup
    groupIn?: EnumReliefGroupFieldUpdateOperationsInput | $Enums.ReliefGroup
    eventType?: EnumSwapEventTypeFieldUpdateOperationsInput | $Enums.SwapEventType
    status?: EnumSwapStatusFieldUpdateOperationsInput | $Enums.SwapStatus
    observation?: NullableStringFieldUpdateOperationsInput | string | null
    isMirror?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    originalRequest?: SwapRequestUpdateOneWithoutMirrorRequestNestedInput
    mirrorRequest?: SwapRequestUpdateOneWithoutOriginalRequestNestedInput
  }

  export type SwapRequestUncheckedUpdateWithoutSubmittedByInput = {
    id?: IntFieldUpdateOperationsInput | number
    employeeIdOut?: StringFieldUpdateOperationsInput | string
    employeeIdIn?: StringFieldUpdateOperationsInput | string
    swapDate?: DateTimeFieldUpdateOperationsInput | Date | string
    paybackDate?: DateTimeFieldUpdateOperationsInput | Date | string
    employeeFunction?: EnumEmployeeFunctionFieldUpdateOperationsInput | $Enums.EmployeeFunction
    groupOut?: EnumReliefGroupFieldUpdateOperationsInput | $Enums.ReliefGroup
    groupIn?: EnumReliefGroupFieldUpdateOperationsInput | $Enums.ReliefGroup
    eventType?: EnumSwapEventTypeFieldUpdateOperationsInput | $Enums.SwapEventType
    status?: EnumSwapStatusFieldUpdateOperationsInput | $Enums.SwapStatus
    observation?: NullableStringFieldUpdateOperationsInput | string | null
    isMirror?: BoolFieldUpdateOperationsInput | boolean
    relatedRequestId?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    mirrorRequest?: SwapRequestUncheckedUpdateOneWithoutOriginalRequestNestedInput
  }

  export type SwapRequestUncheckedUpdateManyWithoutSubmittedByInput = {
    id?: IntFieldUpdateOperationsInput | number
    employeeIdOut?: StringFieldUpdateOperationsInput | string
    employeeIdIn?: StringFieldUpdateOperationsInput | string
    swapDate?: DateTimeFieldUpdateOperationsInput | Date | string
    paybackDate?: DateTimeFieldUpdateOperationsInput | Date | string
    employeeFunction?: EnumEmployeeFunctionFieldUpdateOperationsInput | $Enums.EmployeeFunction
    groupOut?: EnumReliefGroupFieldUpdateOperationsInput | $Enums.ReliefGroup
    groupIn?: EnumReliefGroupFieldUpdateOperationsInput | $Enums.ReliefGroup
    eventType?: EnumSwapEventTypeFieldUpdateOperationsInput | $Enums.SwapEventType
    status?: EnumSwapStatusFieldUpdateOperationsInput | $Enums.SwapStatus
    observation?: NullableStringFieldUpdateOperationsInput | string | null
    isMirror?: BoolFieldUpdateOperationsInput | boolean
    relatedRequestId?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogUpdateWithoutPerformedByInput = {
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    action?: StringFieldUpdateOperationsInput | string
    details?: NullableStringFieldUpdateOperationsInput | string | null
    userLoginIdentifier?: StringFieldUpdateOperationsInput | string
    targetResourceId?: NullableIntFieldUpdateOperationsInput | number | null
    targetResourceType?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AuditLogUncheckedUpdateWithoutPerformedByInput = {
    id?: IntFieldUpdateOperationsInput | number
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    action?: StringFieldUpdateOperationsInput | string
    details?: NullableStringFieldUpdateOperationsInput | string | null
    userLoginIdentifier?: StringFieldUpdateOperationsInput | string
    targetResourceId?: NullableIntFieldUpdateOperationsInput | number | null
    targetResourceType?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AuditLogUncheckedUpdateManyWithoutPerformedByInput = {
    id?: IntFieldUpdateOperationsInput | number
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
    action?: StringFieldUpdateOperationsInput | string
    details?: NullableStringFieldUpdateOperationsInput | string | null
    userLoginIdentifier?: StringFieldUpdateOperationsInput | string
    targetResourceId?: NullableIntFieldUpdateOperationsInput | number | null
    targetResourceType?: NullableStringFieldUpdateOperationsInput | string | null
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}