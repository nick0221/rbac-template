<?php

namespace App\Logging;

use Monolog\Logger;
use Monolog\Formatter\LineFormatter;

class PrettyLogFormatter
{
    /**
     * Create a new class instance.
     */
    public function __invoke($logger)
    {
        foreach ($logger->getHandlers() as $handler) {
            $handler->setFormatter(
                new LineFormatter(
                    "[%datetime%]\n%level_name%: %message%\n%context%\n\n",
                    'Y-m-d H:i:s',
                    true,
                    true
                )
            );
        }
    }
}
