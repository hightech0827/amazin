import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { detailsUser, updateUser } from 'src/apis/userAPI';
import { userUpdateActions } from 'src/slice/UserSlice';

export function useUserEdit(
  [setName, setEmail, setIsSeller, setIsAdmin]: SetState[],
  history: HistoryProp,
  match: MatchProp
) {
  const dispatch = useDispatch();
  const paramUserId = match.params.id;
  const { user, loading, error } = useSelector((state: AppState) => state.userDetails);
  const userUpdate = useSelector((state: AppState) => state.userUpdate);

  useEffect(() => {
    if (userUpdate.success) {
      dispatch(userUpdateActions._RESET(''));
      history.push('/user-list');
    }

    if (!user) dispatch(detailsUser(paramUserId));
    else {
      setName(user.name);
      setEmail(user.email);
      setIsSeller(user.isSeller);
      setIsAdmin(user.isAdmin);
    } // eslint-disable-next-line
  }, [user, userUpdate.success, paramUserId, history, dispatch]);

  const submitUser = (name: string, email: string, isSeller: boolean, isAdmin: boolean) => (e: EventType) => {
    e.preventDefault();
    dispatch(updateUser({ name, email, isSeller, isAdmin, _id: paramUserId }));
  };

  return { user, loading, error, userUpdate, submitUser };
}
