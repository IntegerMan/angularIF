import {Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {InteractiveFictionService} from '../../engine/interactive-fiction.service';
import {LoggingService} from '../../utility/logging.service';
import {TreeNode} from 'primeng/primeng';
import {Story} from '../../engine/entities/story';
import {ActivatedRoute, Params} from '@angular/router';
import {CommonVerbService} from '../../engine/verbs/common-verb.service';
import {TextOutputService} from '../../engine/text-output.service';
import {StoryService} from '../../engine/story.service';
import {Subscription} from 'rxjs/Subscription';
import {EditorTreeComponent} from '../editor-tree/editor-tree.component';

@Component({
  selector: 'if-editor-host',
  templateUrl: './editor-host.component.html',
  styleUrls: ['./editor-host.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class EditorHostComponent implements OnInit, OnDestroy {

  public story: Story;
  public loading: boolean = true;
  public selectedNode: TreeNode;
  private routerSubscription: Subscription;

  @ViewChild('editTree') private treeControl: EditorTreeComponent;

  constructor(private outputService: TextOutputService,
              private logger: LoggingService,
              private route: ActivatedRoute,
              private ifService: InteractiveFictionService,
              private storyService: StoryService,
              private verbService: CommonVerbService) {

  }

  ngOnInit() {
    this.routerSubscription = this.route.params.subscribe(p => this.loadFromParameters(p));
  }

  ngOnDestroy(): void {

    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }

  }

  onNodeSelected(node: TreeNode) {
    this.logger.debug(`Node Selected`);
    this.logger.debug(node);
    this.selectedNode = node;
  }

  private loadFromParameters(p: Params | undefined) {

    LoggingService.instance.debug(`Loaded route parameters`);

    if (!p) {
      // TODO: Redirect to a not found route
      LoggingService.instance.warning(`No route parameters detected`);
      LoggingService.instance.debug(p);
      return;
    }

    const storyKey: string = p['key'];

    if (storyKey === undefined) {
      LoggingService.instance.debug(`Starting from blank story`);
      this.story = this.storyService.buildEmptyStory();
    } else {
      LoggingService.instance.debug(`Loading story with key ${storyKey}`);
      this.story = this.storyService.getStory(storyKey);
    }

    if (!this.story) {
      // TODO: Redirect to a not found route
      LoggingService.instance.warning(`Story ${storyKey} could not be found.`);
      return;
    }

    LoggingService.instance.debug(`Loaded story ${this.story.name}`);

    // Import the common set of verbs
    for (const verb of this.verbService.getCommonVerbs()) {
      this.story.verbHandlers.push(verb);
    }

    this.loading = false;
    if (this.treeControl) {
      this.selectedNode = this.treeControl.selectedNode;
    }
  }

}
