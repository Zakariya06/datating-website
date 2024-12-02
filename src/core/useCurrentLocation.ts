import { shallowEqual, useSelector } from 'react-redux';
import { getGeoLocation } from '../selectors/AuthenticationSelectors';

export function useCurrentLocation() {
  return useSelector(getGeoLocation, shallowEqual);
}

export default useCurrentLocation;
