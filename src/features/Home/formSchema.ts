import * as Yup from 'yup';

export const scrapePlaylistSchema = Yup.object({
  playlistUrl: Yup.string().trim().required('Playlist URL is required'),
});

export type ScrapePlaylistFormData = Yup.InferType<typeof scrapePlaylistSchema>;
