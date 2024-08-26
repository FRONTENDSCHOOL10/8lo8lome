import { useLayoutEffect } from 'react';
import { useImmer } from 'use-immer';

function useFecth(url) {
  const [state, setState] = useImmer({
    isLoading: false,
    error: null,
    data: null,
  });

  useLayoutEffect(() => {
    setState((draft) => {
      draft.isLoading = true;
    });

    const controller = new AbortController();

    const fetchData = async () => {
      try {
        const response = await fetch(url, {
          signal: controller.signal,
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(response.statusText);
        }

        const jsonData = await response.json();

        setState((draft) => {
          draft.isLoading = false;
          draft.data = jsonData;
        });
      } catch (error) {
        if (!(error instanceof DOMException)) {
          setState((draft) => {
            draft.isLoading = false;
            draft.error = error;
          });
        }
      }
    };

    fetchData();

    return () => {
      controller.abort();
    };
  }, [url, setState]);

  return state;
}

export default useFecth;
