import cats, {
  initialState,
  setLoading,
  setError,
  setImages,
  setFavourites,
  setVotes,
  setRedirect,
  selectImages,
  selectLoading,
  selectError,
  selectRedirect,
  selectPaginationCount,
  selectFavouriteById,
  selectVotesUpById,
  selectVotesDownById,
} from "./catsSlice";

describe("catsSlice reducer", () => {
  const image = {
    id: "_zSHBGpT_",
  };
  const images = [image];
  const imagesPayload = {
    data: images,
    pagination_count: images.length,
  };

  describe("actions", () => {
    it("should handle initial state", () => {
      expect(cats(undefined, {})).toEqual(initialState);
    });

    it("should handle setLoading", () => {
      expect(
        cats(initialState, {
          type: setLoading.type,
          payload: true,
        })
      ).toEqual({
        ...initialState,
        isLoading: true,
      });
    });

    it("should handle setError", () => {
      expect(
        cats(initialState, {
          type: setError.type,
          payload: "some error",
        })
      ).toEqual({
        ...initialState,
        error: "some error",
      });
    });

    it("should handle setImages", () => {
      expect(
        cats(initialState, {
          type: setImages.type,
          payload: {
            ...imagesPayload,
          },
        })
      ).toEqual({
        ...initialState,
        images,
        pagination_count: 1,
      });
    });

    it("should handle setFavourites", () => {
      expect(
        cats(initialState, {
          type: setFavourites.type,
          payload: [{}],
        })
      ).toEqual({
        ...initialState,
        favourites: [{}],
      });
    });

    it("should handle setVotes", () => {
      expect(
        cats(initialState, {
          type: setVotes.type,
          payload: [{}],
        })
      ).toEqual({
        ...initialState,
        votes: [{}],
      });
    });

    it("should handle setRedirect", () => {
      expect(
        cats(initialState, {
          type: setRedirect.type,
          payload: true,
        })
      ).toEqual({
        ...initialState,
        redirect: true,
      });
    });
  });

  describe("selectors", () => {
    it("selectImages", () => {
      // Act
      const nextState = cats(initialState, setImages({ ...imagesPayload }));

      // Assert
      const rootState = { cats: nextState };
      expect(selectImages(rootState)).toEqual(images);
      expect(selectPaginationCount(rootState)).toEqual(1);
      expect(selectLoading(rootState)).toEqual(false);
      expect(selectRedirect(rootState)).toEqual(false);
      expect(selectError(rootState)).toEqual(undefined);
    });
    it("selectFavouriteById", () => {
      // Arrange
      const favoriteImage = {
        id: 1,
        image_id: "_zSHBGpT_",
      };
      const favourites = [favoriteImage];

      // Act
      const nextState = cats(initialState, setFavourites(favourites));

      // Assert
      const rootState = { cats: nextState };
      expect(selectFavouriteById(rootState, favoriteImage.image_id)).toEqual(
        favoriteImage
      );
      expect(selectFavouriteById(rootState, "image_id")).toEqual(undefined);
    });
    it("selectVotesUpById", () => {
      // Arrange
      const votesUpImage = {
        id: 1,
        image_id: "_zSHBGpT_",
        value: 1,
      };
      const votesUpImage2 = {
        id: 2,
        image_id: "_zSHBGpT_",
        value: 1,
      };
      const votesDownImage = {
        id: 2,
        image_id: "_zSHBGpT_",
        value: 0,
      };
      const votes = [votesUpImage, votesUpImage2, votesDownImage];

      // Act
      const nextState = cats(initialState, setVotes(votes));

      // Assert
      const rootState = { cats: nextState };

      // VotesUp
      expect(selectVotesUpById(rootState, votesUpImage.image_id)).toEqual(2);
      expect(selectVotesUpById(rootState, "image_id")).toEqual(0);

      // VotesDown
      expect(selectVotesDownById(rootState, votesUpImage.image_id)).toEqual(1);
      expect(selectVotesDownById(rootState, "image_id")).toEqual(0);
    });
  });
});
