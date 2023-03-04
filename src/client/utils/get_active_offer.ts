import type { LimitedTimeOfferFragmentResponse } from '../graphql/fragments';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
dayjs.extend(isBetween);

export function getActiveOffer(
  offers: LimitedTimeOfferFragmentResponse[],
): LimitedTimeOfferFragmentResponse | undefined {
  const activeOffer = offers.find((offer) => {
    const now = dayjs();
    const startDate = dayjs(offer.startDate);
    const endDate = dayjs(offer.endDate);

    return now.isBetween(startDate, endDate);
  });

  return activeOffer;
}
