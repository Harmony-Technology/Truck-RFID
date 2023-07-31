import { useSession } from "next-auth/react";
import { useEffect } from "react";

const RefreshTokenHandler = (props) => {
  const { data: session } = useSession();

  useEffect(() => {
    if (!!session) {
      const timeRemaining = session.expires;
      props.setRefetchInterval(parseInt(timeRemaining) > 0 ? timeRemaining : 0);
    }
  }, [session]);
  return null;
};

export default RefreshTokenHandler;
