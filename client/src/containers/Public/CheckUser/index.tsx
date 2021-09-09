import React, { useEffect } from "react";
import qs from "qs";
import { useStore } from "stores";
import Loader from "components/Loader";
import history from "utils/history";
import { observer } from "mobx-react";
import { toJS } from "mobx";

const CheckUser = observer(() => {
  const { authStore } = useStore();

  useEffect(() => {
    const parsedQs = qs.parse(window.location.search, {
      ignoreQueryPrefix: true,
    });
    console.log(parsedQs);
    if (parsedQs.hasOwnProperty("token")) {
      const token = qs.stringify(parsedQs).replace("token=", "");
      localStorage.setItem("jwt", token);
      checkUserAuthorize(token);
    }
  }, []);

  useEffect(() => {
    if (authStore.user) {
      history.replace("/books");
    }
  }, [authStore.user]);

  const checkUserAuthorize = async (token: string) => {
    if (localStorage.getItem("jwt")) await authStore.checkUserAuthorize(token);
  };

  return (
    <div>
      <h2>
        Checking authorization... <Loader />
      </h2>
    </div>
  );
});

export default CheckUser;
