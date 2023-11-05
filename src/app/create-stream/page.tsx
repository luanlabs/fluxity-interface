"use client";

import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "src/hooks/useRedux";
import { getTokenList } from "src/features/getTokenList";
import CreateStreamMainCard from "src/containers/CreateStreamMainCard";
import { loadTokens } from "src/reducers/tokens";

const CreateStream = () => {
  const dispatch = useAppDispatch();
  const tokens = useAppSelector((state) => state.tokens);

  useEffect(() => {
    if (!tokens.length) {
      getTokenList().then((data) => {
        const mappedTokens = data.data.result.map((token) => {
          return { ...token, balance: "0" };
        });

        dispatch(loadTokens(mappedTokens));
      });
    }
  }, [dispatch]);
  return <CreateStreamMainCard />;
};

export default CreateStream;
