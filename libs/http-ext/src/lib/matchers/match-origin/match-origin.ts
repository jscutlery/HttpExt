import { RequestCondition } from '../../plugin';
import { getOrigin } from './get-origin';
import { matchArrayOrigin } from './match-array-origin';
import { OriginMatchExpression } from './origin-match-expression';
import { matchPredicateOrigin } from './match-predicate-origin';
import { matchRegExpOrigin } from './match-reg-exp-origin';
import { matchStringOrigin, originStringMatcher } from './match-string-origin';
import { OriginMatcher } from './origin-matcher';

export const originMatcherList: OriginMatcher[] = [originStringMatcher];

export const matchOrigin = (
  matchExpression: OriginMatchExpression
): RequestCondition => ({ request }): boolean => {
  const origin = getOrigin(request.url);

  const matcher = originMatcherList.find(_matcher =>
    _matcher.canHandle(matchExpression)
  );

  if (matcher != null) {
    return matcher.handle({
      matchExpression,
      origin
    });
  }

  return [matchArrayOrigin, matchRegExpOrigin, matchPredicateOrigin].some(
    match => match(origin, matchExpression)
  );
};
