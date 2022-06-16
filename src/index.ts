import * as types from "./@types/index";
import { Client } from "./client/client";
import {
  MessageManager,
  ISendTemplateMessageOptions,
} from "./managers/MessageManager";
import { Message } from "./structures/Message";

export { Client };

// Managers
export { MessageManager };

// Structures
export { Message };

// Interfaces
export { ISendTemplateMessageOptions };
export { types };
