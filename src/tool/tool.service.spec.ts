import { Test, TestingModule } from '@nestjs/testing';
import { ToolService } from './tool.service';

describe('ToolService', () => {
  let service: ToolService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ToolService],
    }).compile();

    service = module.get<ToolService>(ToolService);
  });

  //create a test for the getTools method
  //create a test for the create method
  //create a test for the delete method

  it('should return a list of tools', async () => {
    const tools = await service.getTools();
    expect(tools).toBeDefined();
    expect(tools.meta.total).toBeGreaterThan(0);
  });

  it('should create a tool', async () => {
    const tool = await service.create({
      title: 'Test tool',
      link: 'http://test.com',
      description: 'Test tool description',
      tags: ['test', 'tool'],
    });
    expect(tool).toBeDefined();
    expect(tool.id).toBeDefined();
  });

  it('should delete a tool', async () => {
    const tool = await service.create({
      title: 'Test tool',
      link: 'http://test.com',
      description: 'Test tool description',
      tags: ['test', 'tool'],
    });
    expect(tool).toBeDefined();
    expect(tool.id).toBeDefined();
    await service.delete(tool.id);
    const deletedTool = await service.getTool(tool.id);
    expect(deletedTool).toBeUndefined();
  });
});
