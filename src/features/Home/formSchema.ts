import * as Yup from 'yup';

export const scrapePlaylistSchema = Yup.object({
  email: Yup.string().trim().required('Email is required'),
  playlistUrl: Yup.string().trim().required('Playlist URL is required'),
});

export type ScrapePlaylistFormData = Yup.InferType<typeof scrapePlaylistSchema>;
