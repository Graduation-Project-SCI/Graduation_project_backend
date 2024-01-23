import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import algoliasearch from 'algoliasearch';
import { config } from '../../config';
import { sendResponse } from '../helper/sendResponse';

const prisma = new PrismaClient();
const algoliaClient = algoliasearch(config.algolia.appId, config.algolia.apiKey);
const algoliaIndex = algoliaClient.initIndex('professors');
export class SearchController {
    
    public static search = async (req: Request, res: Response) => {
        try {
            const query = req.query.query as string;

            if (!query) {
                return sendResponse(res, 400, 'Query parameter is required.');
            }
            const searchResults = await algoliaIndex.search(query);
            const objectIds = searchResults.hits.map(hit => parseInt(hit.objectID));

            // Fetch corresponding professors from the database using Prisma
            const professors = await Promise.all(objectIds.map(id => 
                prisma.professor.findUnique({
                    where: { id },
                    include: {
                        professorAttachment: true,
                        department: true
                    }
                })
            ));

            // Filter out null results and remove password from the response
            const processedProfessors = professors
                .filter(professor => professor !== null)
                .map(professor => {
                    if (professor) {
                        const { password, ...professorWithoutPassword } = professor;
                        return professorWithoutPassword;
                    }
                    return null;
                });

            return sendResponse(res, 200, 'success', processedProfessors);
        } catch (error) {
            console.error('Error during Algolia search:', error);
            return sendResponse(res, 500, "Error during search", error);
        }
    }
}
