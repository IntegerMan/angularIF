/**
 * Part of speech classifications for incoming tokens. This should be sorted in priority order with the most important tags at the top
 */
export enum TokenClassification {

  /**
   * This is a compass direction which typically will behave like either a noun or a verb in interactive fiction.
   * @type {string}
   */
  Direction,

  /**
   * Represents a verb such as eat, throw, or move
   * @type {string}
   */
  Verb,

  /**
   * Represents an object or target of an action
   * @type {string}
   */
  Noun,

  QuestionWord,

  /**
   * This is a descriptive word modifying a noun.
   * @type {string}
   */
  Adjective,

  Adverb,

  /**
   * This is essentially an article such as 'the' and can be nearly universally ignored.
   * @type {string}
   */
  Determiner,

  /**
   * This is a linking word such as 'to' or 'with' and can usually be ignored.
   * @type {string}
   */
  Preposition,

  /**
   * This is a linking word such as 'and' and can usually be ignored.
   * @type {string}
   */
  Conjunction,

  /**
   * Represents something that eludes classification.
   * @type {string}
   */
  Unknown

}
