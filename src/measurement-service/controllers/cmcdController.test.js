const cmcdController = require('./cmcdController');
const cmcdService = require('../services/cmcdService');

jest.mock('../services/cmcdService');

describe('getCMCD', () => {
  test('should return all CMCD entries with status code 200', async () => {
    const mockResults = [{ id: 1, name: 'Entry 1' }, { id: 2, name: 'Entry 2' }];
    cmcdService.getAllCMCDEntries.mockResolvedValue(mockResults);

    const mockReq = {};
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await cmcdController.getCMCD(mockReq, mockRes);

    expect(cmcdService.getAllCMCDEntries).toHaveBeenCalled();
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith(mockResults);
  });
});

describe('getCMCDbySessionId', () => {
  test('should return all CMCD entries by session ID with status code 200', async () => {
    const mockResults = [{ id: 1, name: 'Entry 1' }, { id: 2, name: 'Entry 2' }];
    cmcdService.getCMCDEntriesBySessionId.mockResolvedValue(mockResults);

    const mockReq = { params: { sid: 1 } };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await cmcdController.getCMCDbySessionId(mockReq, mockRes);

    expect(cmcdService.getCMCDEntriesBySessionId).toHaveBeenCalledWith(1);
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith(mockResults);
  });
});

describe('postCMCD', () => {
  test('should return status code 400 when sid is missing', async () => {
    const mockReq = { body: {} };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };

    await cmcdController.postCMCD(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.send).toHaveBeenCalledWith('sid is required.');
  });
});