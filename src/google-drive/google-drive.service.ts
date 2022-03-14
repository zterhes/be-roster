import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { drive_v3, google } from 'googleapis';
import { GoogleAuth } from 'googleapis-common';
import driveConfigService from 'src/config/googleDrive.config';

@Injectable()
export class GoogleDriveService {
  async upload() {
    const auth: GoogleAuth = driveConfigService();
    const driveService = google.drive({ version: 'v3', auth });

    var folderId = '1Y-sr3w0P1yBUwr_kyK3vb2CX4ImoHx9l';
    var fileMetadata = {
      name: 'photo.jpg',
      parents: [folderId],
    };
    var media = {
      mimeType: 'image/jpeg',
      body: fs.createReadStream('src/google-drive/test.png'),
    };

    const create = {
      resource: fileMetadata,
      media: media,
      fields: 'id',
    }

    let response = await driveService.files.create(create);
    console.log('response', response)
  }
}
