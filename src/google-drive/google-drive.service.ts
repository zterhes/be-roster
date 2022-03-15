import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { google } from 'googleapis';
import { GoogleAuth } from 'googleapis-common';
import driveConfigService from 'src/config/googleDrive.config';
import { Readable } from 'stream';
import { DriveError } from './google-drive.error';

@Injectable()
export class GoogleDriveService {
  async upload(id: string, file: Express.Multer.File) {
    const auth: GoogleAuth = driveConfigService();
    const driveService = google.drive({ version: 'v3', auth });

    const stream: Readable = Readable.from(file.buffer);

    const folderId: string = process.env.PLAYER_PHOTO_FOLDER_ID;
    const fileMetadata = {
      name: id,
      parents: [folderId],
    };
    const media = {
      mimeType: 'image/jpeg',
      body: stream,
    };

    const create = {
      resource: fileMetadata,
      media: media,
      fields: 'id',
    };
    try {
      const response = await driveService.files.create(create);
      return response;
    } catch (error) {
      throw new DriveError(
        'Photo upload unsuccessful error message: ' + error.message,
      );
    }
  }
}
