import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import MockAdapter from "axios-mock-adapter";
import axios from "axios";
import fs from "fs";
import {
  initialState,
  setLoading,
  setImages,
  setError,
  setVotes,
  setFavourites,
  setRedirect,
} from "../redux/slices/catsSlice";
import * as TheCatAPI from "./index";

const mockStore = configureMockStore([thunk]);

describe("TheCatAPI thunks", () => {
  let mock;
  let store;

  const favoriteImage = {
    id: 1006,
    image_id: "_zSHBGpT_",
  };
  const favourites = [favoriteImage];
  const responseFavouritesPayload = {
    data: favourites,
  };
  const favUrl = TheCatAPI.FAVOURITES_ENDPOINT;

  const errorResponse = {
    message: "some error",
  };

  const votesUpImage = {
    id: 1,
    image_id: "_zSHBGpT_",
    value: 1,
  };
  const votes = [votesUpImage];
  const responseVotesPayload = {
    data: votes,
  };
  const votesUrl = TheCatAPI.VOTES_ENDPOINT;
  const getVotesUrl = `${votesUrl}?limit=300`;

  const uploadUrl = TheCatAPI.UPLOAD_ENDPOINT;

  const responseSuccessPayload = {
    message: "SUCCESS",
    id: 1708,
  };

  const expectedErrorActions = [
    setLoading(true),
    setError(errorResponse.message),
  ];

  beforeEach(() => {
    mock = new MockAdapter(axios);
    store = mockStore(initialState);
  });

  describe("getImages", () => {
    const page = 0;
    const limit = 4;
    const orderBy = "ASC";
    const imgUrl = `${TheCatAPI.IMAGES_ENDPOINT}?page=${page}&limit=${limit}&order=${orderBy}`;

    it("success", async () => {
      const image = { id: "_zSHBGpT_" };
      const images = [image];
      const responsePayload = {
        data: images,
      };
      const headers = {
        "pagination-count": 0,
      };

      mock.onGet(imgUrl).reply(200, responsePayload, headers);
      mock.onGet(favUrl).reply(200, responseFavouritesPayload);
      mock.onGet(getVotesUrl).reply(200, responseVotesPayload);

      await store.dispatch(TheCatAPI.getImages(page, limit, orderBy));
      const data = {
        data: responsePayload,
        pagination_count: headers["pagination-count"],
      };
      const expectedActions = [
        setLoading(true),
        setImages(data),
        setLoading(true),
        setFavourites({ data: favourites }),
        setLoading(true),
        setVotes({ data: votes }),
      ];
      expect(store.getActions()).toEqual(expectedActions);
    });
    it("error", async () => {
      mock.onGet(imgUrl).reply(500, errorResponse);

      await store.dispatch(TheCatAPI.getImages(page, limit, orderBy));
      expect(store.getActions()).toEqual(expectedErrorActions);
    });
  });

  describe("Favourites", () => {
    const data = {
      image_id: "_zSHBGpT_",
    };
    const expectedSuccessActions = [
      setLoading(true),
      setLoading(true),
      setFavourites({ data: favourites }),
    ];
    describe("saveFavourite", () => {
      it("success", async () => {
        mock.onPost(favUrl, data).reply(200, responseSuccessPayload);
        mock.onGet(favUrl).reply(200, responseFavouritesPayload);

        await store.dispatch(TheCatAPI.saveFavourite(data.image_id));
        expect(store.getActions()).toEqual(expectedSuccessActions);
      });
      it("error", async () => {
        mock.onPost(favUrl, data).reply(500, errorResponse);

        await store.dispatch(TheCatAPI.saveFavourite(data.image_id));
        expect(store.getActions()).toEqual(expectedErrorActions);
      });
    });
    describe("deleteFavourite", () => {
      it("success", async () => {
        const responseSuccess = {
          message: "SUCCESS",
        };
        mock.onDelete(`${favUrl}/${data.image_id}`).reply(200, responseSuccess);
        mock.onGet(favUrl).reply(200, responseFavouritesPayload);

        await store.dispatch(TheCatAPI.deleteFavourite(data.image_id));
        expect(store.getActions()).toEqual(expectedSuccessActions);
      });
      it("error", async () => {
        mock.onDelete(`${favUrl}/${data.image_id}`).reply(500, errorResponse);

        await store.dispatch(TheCatAPI.deleteFavourite(data.image_id));
        expect(store.getActions()).toEqual(expectedErrorActions);
      });
    });
  });

  describe("Votes", () => {
    const data = {
      image_id: "_zSHBGpT_",
      value: 1,
    };
    describe("toggleVote", () => {
      it("success", async () => {
        mock.onPost(votesUrl, data).reply(200, responseSuccessPayload);
        mock.onGet(getVotesUrl).reply(200, responseVotesPayload);

        await store.dispatch(TheCatAPI.toggleVote(data.image_id, data.value));
        const expectedActions = [
          setLoading(true),
          setLoading(true),
          setVotes({ data: votes }),
        ];
        expect(store.getActions()).toEqual(expectedActions);
      });
      it("error", async () => {
        mock.onPost(votesUrl, data).reply(500, errorResponse);

        await store.dispatch(TheCatAPI.toggleVote(data.image_id, data.value));
        expect(store.getActions()).toEqual(expectedErrorActions);
      });
    });
  });

  describe("uploadImage", () => {
    it("success", async () => {
      const selectedImage = new File(Array.from("file contents"), "file.jpg", {
        name: "file.jpg",
        size: 1024 * 1024 * 2,
        type: "image/jpeg",
        lastModified: new Date(),
      });

      // const headers = {
      //   "Content-Type": "multipart/form-data",
      // };
      // const formData = new FormData();
      // formData.append("file", selectedImage);
      // mock.onPost(uploadUrl, formData, {
      //   headers: {
      //     'content-type': 'multipart/form-data'
      //   }}).reply(200, {body: {}});

      mock.onAny().reply(function (config) {
        return [200, fs.createReadStream(__filename)];
      });

      await store.dispatch(TheCatAPI.uploadImage(selectedImage));
      const expectedActions = [setLoading(true), setRedirect(true)];
      expect(store.getActions()).toEqual(expectedActions);
    });
    it("error", async () => {
      mock.onPost(uploadUrl, undefined).reply(500, errorResponse);
      await store.dispatch(TheCatAPI.uploadImage(undefined));
      expect(store.getActions()).toEqual(expectedErrorActions);
    });
  });
});
